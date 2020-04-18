package expo.modules.updates.loader;

import android.content.Context;
import android.util.Log;

import expo.modules.updates.db.enums.UpdateStatus;
import expo.modules.updates.UpdatesUtils;
import expo.modules.updates.db.UpdatesDatabase;
import expo.modules.updates.db.entity.AssetEntity;
import expo.modules.updates.db.entity.UpdateEntity;
import expo.modules.updates.manifest.BareManifest;
import expo.modules.updates.manifest.Manifest;
import expo.modules.updates.manifest.ManifestFactory;

import org.apache.commons.io.IOUtils;
import org.json.JSONObject;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Date;

public class EmbeddedLoader {

  private static final String TAG = EmbeddedLoader.class.getSimpleName();

  public static final String MANIFEST_FILENAME = "app.manifest";
  public static final String BUNDLE_FILENAME = "app.bundle";

  private static Manifest sEmbeddedManifest = null;

  private Context mContext;
  private UpdatesDatabase mDatabase;
  private File mUpdatesDirectory;

  public EmbeddedLoader(Context context, UpdatesDatabase database, File updatesDirectory) {
    mContext = context;
    mDatabase = database;
    mUpdatesDirectory = updatesDirectory;
  }

  public boolean loadEmbeddedUpdate() {
    Manifest manifest = readEmbeddedManifest(mContext);
    if (manifest == null) {
      return false;
    }

//    EmbeddedManagedAppLoader managedAppLoader = new EmbeddedManagedAppLoader(mContext, mDatabase, mUpdatesDirectory);
//    return managedAppLoader.loadEmbeddedUpdate(manifest);

    EmbeddedBareAppLoader bareAppLoader = new EmbeddedBareAppLoader(mContext, mDatabase, mUpdatesDirectory);
    return bareAppLoader.loadBareUpdate(manifest);
  }

  public static Manifest readEmbeddedManifest(Context context) {
    if (sEmbeddedManifest == null) {
      try (InputStream stream = context.getAssets().open(MANIFEST_FILENAME)) {
        String manifestString = IOUtils.toString(stream, "UTF-8");
//        sEmbeddedManifest = ManifestFactory.getManifest(context, new JSONObject(manifestString));
        sEmbeddedManifest = BareManifest.fromManifestJson(new JSONObject(manifestString));
      } catch (Exception e) {
        Log.e(TAG, "Could not read embedded manifest", e);
        throw new AssertionError("The embedded manifest is invalid or could not be read. Make sure you have created app.manifest and app.bundle files and added them to the `assets` folder. If you are using Expo CLI, make sure you have run `expo publish` or `expo export` at least once. More information at https://expo.fyi/embedded-assets");
      }
    }

    return sEmbeddedManifest;
  }
}
