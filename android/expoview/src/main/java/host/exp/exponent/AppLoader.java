// Copyright 2015-present 650 Industries. All rights reserved.

package host.exp.exponent;

import android.content.Context;
import android.net.Uri;

import com.facebook.react.bridge.WritableMap;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.util.HashMap;
import java.util.StringJoiner;
import java.util.stream.Collectors;

import javax.inject.Inject;

import expo.modules.updates.UpdatesConfiguration;
import expo.modules.updates.UpdatesUtils;
import expo.modules.updates.db.DatabaseHolder;
import expo.modules.updates.launcher.Launcher;
import expo.modules.updates.launcher.SelectionPolicy;
import expo.modules.updates.launcher.SelectionPolicyNewest;
import expo.modules.updates.loader.FileDownloader;
import expo.modules.updates.loader.LoaderTask;
import expo.modules.updates.manifest.Manifest;
import host.exp.exponent.analytics.Analytics;
import host.exp.exponent.analytics.EXL;
import host.exp.exponent.di.NativeModuleDepsProvider;
import host.exp.exponent.exceptions.ExceptionUtils;
import host.exp.exponent.kernel.ExponentUrls;
import host.exp.exponent.storage.ExponentDB;
import host.exp.exponent.storage.ExponentSharedPreferences;
import host.exp.expoview.ExpoViewBuildConfig;
import host.exp.expoview.Exponent;

public abstract class AppLoader {

  @Inject
  ExponentManifest mExponentManifest;

  @Inject
  ExponentSharedPreferences mExponentSharedPreferences;

  @Inject
  DatabaseHolder mDatabaseHolder;

  private String mManifestUrl;
  private final boolean mUseCacheOnly;

  private Context mContext;

  public static final String UPDATES_EVENT_NAME = "Exponent.nativeUpdatesEvent";
  public static final String UPDATE_DOWNLOAD_START_EVENT = "downloadStart";
  public static final String UPDATE_DOWNLOAD_PROGRESS_EVENT = "downloadProgress";
  public static final String UPDATE_DOWNLOAD_FINISHED_EVENT = "downloadFinished";
  public static final String UPDATE_NO_UPDATE_AVAILABLE_EVENT = "noUpdateAvailable";
  public static final String UPDATE_ERROR_EVENT = "error";

  public AppLoader(String manifestUrl) {
    this(manifestUrl, false, null);
  }

  public AppLoader(String manifestUrl, boolean useCacheOnly, Context context) {
    NativeModuleDepsProvider.getInstance().inject(AppLoader.class, this);

    mManifestUrl = manifestUrl;
    mUseCacheOnly = useCacheOnly;
    mContext = context;
  }

  public void startDevMode() {
    HashMap<String, Object> configMap = new HashMap<>();
    configMap.put(UpdatesConfiguration.UPDATES_CONFIGURATION_UPDATE_URL_KEY, mExponentManifest.httpManifestUrl(mManifestUrl));
    configMap.put(UpdatesConfiguration.UPDATES_CONFIGURATION_SCOPE_KEY_KEY, mManifestUrl);
    configMap.put(UpdatesConfiguration.UPDATES_CONFIGURATION_SDK_VERSION_KEY, Constants.SDK_VERSIONS);
    HashMap<String, String> headers = new HashMap<>();
    headers.put("Expo-Updates-Environment", "EXPO_CLIENT");
    String sessionSecret = mExponentSharedPreferences.getSessionSecret();
    if (sessionSecret != null) {
      headers.put("Expo-Session", sessionSecret);
    }
    configMap.put(UpdatesConfiguration.UPDATES_CONFIGURATION_REQUEST_HEADERS_KEY, headers);
    UpdatesConfiguration configuration = new UpdatesConfiguration();
    configuration.loadValuesFromMap(configMap);

    FileDownloader.downloadManifest(configuration, mContext, new FileDownloader.ManifestDownloadCallback() {
      @Override
      public void onFailure(String message, Exception e) {
        onError(e);
      }

      @Override
      public void onSuccess(Manifest manifest) {
        JSONObject manifestJson = manifest.getRawManifestJson();

        String bundleUrl;
        try {
          // TODO
          manifestJson.put("isVerified", true);
          bundleUrl = ExponentUrls.toHttp(manifestJson.getString(ExponentManifest.MANIFEST_BUNDLE_URL_KEY));
        } catch (JSONException ex) {
          onError(ex);
          return;
        }

        Analytics.markEvent(Analytics.TimedEvent.FINISHED_FETCHING_MANIFEST);

        mExponentSharedPreferences.updateManifest(mManifestUrl, manifestJson, bundleUrl);
        ExponentDB.saveExperience(mManifestUrl, manifestJson, bundleUrl);

        onManifestCompleted(manifestJson);
      }
    });
  }

  public void start() {
    Uri manifestUrl = mExponentManifest.httpManifestUrl(mManifestUrl);
    // TODO: also need to check for debug mode once manifest is downloaded and abort loadertask, if so
    if ("localhost".equals(manifestUrl.getHost())) {
      startDevMode();
      return;
    }

    HashMap<String, Object> configMap = new HashMap<>();
    configMap.put(UpdatesConfiguration.UPDATES_CONFIGURATION_UPDATE_URL_KEY, manifestUrl);
    configMap.put(UpdatesConfiguration.UPDATES_CONFIGURATION_SCOPE_KEY_KEY, mManifestUrl);
    configMap.put(UpdatesConfiguration.UPDATES_CONFIGURATION_SDK_VERSION_KEY, Constants.SDK_VERSIONS);
    configMap.put(UpdatesConfiguration.UPDATES_CONFIGURATION_HAS_EMBEDDED_UPDATE, false);
    configMap.put(UpdatesConfiguration.UPDATES_CONFIGURATION_ENABLED_KEY, Constants.ARE_REMOTE_UPDATES_ENABLED);
    if (mUseCacheOnly) {
      configMap.put(UpdatesConfiguration.UPDATES_CONFIGURATION_CHECK_ON_LAUNCH_KEY, "NEVER");
      configMap.put(UpdatesConfiguration.UPDATES_CONFIGURATION_LAUNCH_WAIT_MS_KEY, 0);
    } else {
      configMap.put(UpdatesConfiguration.UPDATES_CONFIGURATION_LAUNCH_WAIT_MS_KEY, 10000);
    }

    // if previous run of this app failed due to a loading error, set shouldCheckForUpdate to true regardless
//    JSONObject experienceMetadata = mExponentSharedPreferences.getExperienceMetadata(experienceId);
//    if (experienceMetadata != null && experienceMetadata.optBoolean(ExponentSharedPreferences.EXPERIENCE_METADATA_LOADING_ERROR)) {
//      shouldCheckForUpdate = true;
//    }

    HashMap<String, String> headers = new HashMap<>();
    headers.put("Expo-Updates-Environment", "EXPO_CLIENT");
    String sessionSecret = mExponentSharedPreferences.getSessionSecret();
    if (sessionSecret != null) {
      headers.put("Expo-Session", sessionSecret);
    }
    configMap.put(UpdatesConfiguration.UPDATES_CONFIGURATION_REQUEST_HEADERS_KEY, headers);

    UpdatesConfiguration configuration = new UpdatesConfiguration();
    configuration.loadValuesFromMap(configMap);

    SelectionPolicy selectionPolicy = new SelectionPolicyNewest(Constants.SDK_VERSIONS_LIST);

    File directory;
    try {
      directory = UpdatesUtils.getOrCreateUpdatesDirectory(mContext);
    } catch (Exception e) {
      onError(e);
      return;
    }

    new LoaderTask(configuration, mDatabaseHolder, directory, selectionPolicy, new LoaderTask.LoaderTaskCallback() {
      @Override
      public void onFailure(Exception e) {
        onError(e);
      }

      @Override
      public void onManifestLoaded(Manifest manifest) {
        onOptimisticManifest(manifest.getRawManifestJson());
      }

      @Override
      public void onSuccess(Launcher launcher) {
        JSONObject manifest = launcher.getLaunchedUpdate().metadata;

        String bundleUrl;
        try {
          // TODO
          manifest.put("isVerified", true);
          bundleUrl = ExponentUrls.toHttp(manifest.getString(ExponentManifest.MANIFEST_BUNDLE_URL_KEY));
        } catch (JSONException ex) {
          onError(ex);
          return;
        }

        Analytics.markEvent(Analytics.TimedEvent.FINISHED_FETCHING_MANIFEST);

        mExponentSharedPreferences.updateManifest(mManifestUrl, manifest, bundleUrl);
        ExponentDB.saveExperience(mManifestUrl, manifest, bundleUrl);

        onManifestCompleted(manifest);
        onBundleCompleted(launcher.getLaunchAssetFile());
      }

      @Override
      public void onEvent(String eventName, WritableMap params) {
        // TODO
      }
    }).start(mContext);
  }

  public abstract void onOptimisticManifest(JSONObject optimisticManifest);

  public abstract void onManifestCompleted(JSONObject manifest);

  public abstract void onBundleCompleted(String localBundlePath);

  public abstract void emitEvent(JSONObject params);

  public abstract void onError(Exception e);

  public abstract void onError(String e);
}
