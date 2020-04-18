package expo.modules.updates.manifest;

import android.net.Uri;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;

import expo.modules.updates.UpdatesController;
import expo.modules.updates.UpdatesUtils;
import expo.modules.updates.db.entity.AssetEntity;
import expo.modules.updates.db.entity.UpdateEntity;
import expo.modules.updates.db.enums.UpdateStatus;

public class BareManifest implements Manifest {

  private static String TAG = BareManifest.class.getSimpleName();

  private static Uri EXPO_ASSETS_URL_BASE = Uri.parse("https://d1wp6m56sqw74a.cloudfront.net/~assets/");

  private UUID mId;
  private Date mCommitTime;
  private String mRuntimeVersion;
  private JSONObject mMetadata;
  private JSONArray mAssets;

  private JSONObject mManifestJson;

  private BareManifest(JSONObject manifestJson, UUID id, Date commitTime, String runtimeVersion, JSONObject metadata, JSONArray assets) {
    mManifestJson = manifestJson;
    mId = id;
    mCommitTime = commitTime;
    mRuntimeVersion = runtimeVersion;
    mMetadata = metadata;
    mAssets = assets;
  }

  public static BareManifest fromManifestJson(JSONObject manifestJson) throws JSONException {
    UUID id = UUID.fromString(manifestJson.getString("id"));
    Date commitTime = new Date(manifestJson.getLong("commitTime"));
    String runtimeVersion = UpdatesUtils.getRuntimeVersion(UpdatesController.getInstance().getUpdatesConfiguration());
    JSONObject metadata = manifestJson.optJSONObject("metadata");
    JSONArray assets = manifestJson.optJSONArray("assets");

    return new BareManifest(manifestJson, id, commitTime, runtimeVersion, metadata, assets);
  }

  public JSONObject getRawManifestJson() {
    return mManifestJson;
  }

  public UpdateEntity getUpdateEntity() {
    String projectIdentifier = UpdatesController.getInstance().getUpdateUrl().toString();
    UpdateEntity updateEntity = new UpdateEntity(mId, mCommitTime, mRuntimeVersion, projectIdentifier);
    if (mMetadata != null) {
      updateEntity.metadata = mMetadata;
    }
    updateEntity.status = UpdateStatus.EMBEDDED;

    return updateEntity;
  }

  public ArrayList<AssetEntity> getAssetEntityList() {
    ArrayList<AssetEntity> assetList = new ArrayList<>();

    // TODO: maybe add bundle?

    if (mAssets != null && mAssets.length() > 0) {
      for (int i = 0; i < mAssets.length(); i++) {
        try {
          JSONObject assetObject = mAssets.getJSONObject(i);
          AssetEntity assetEntity = new AssetEntity(
            Uri.withAppendedPath(EXPO_ASSETS_URL_BASE, assetObject.getString("packagerHash")),
            assetObject.getString("type")
          );
          assetEntity.resourcesFilename = assetObject.optString("resourcesFilename");
          assetEntity.resourcesFolder = assetObject.optString("resourcesFolder");
          // if there's only one scale we don't to decide later on which one to copy
          // so we avoid this work now
          JSONArray scales = assetObject.optJSONArray("scales");
          if (scales != null && scales.length() > 1) {
            assetEntity.scale = (float)assetObject.optDouble("scale");
            assetEntity.scales = new Float[scales.length()];
            for (int j = 0; j < scales.length(); j++) {
              assetEntity.scales[j] = (float)scales.getDouble(j);
            }
          }
          assetList.add(assetEntity);
        } catch (JSONException e) {
          Log.e(TAG, "Could not read asset from manifest", e);
        }
      }
    }
    return assetList;
  }
}
