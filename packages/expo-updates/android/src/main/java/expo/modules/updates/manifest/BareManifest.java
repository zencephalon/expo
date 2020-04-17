package expo.modules.updates.manifest;

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
    UUID id = UUID.randomUUID();
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
    return assetList;
  }
}
