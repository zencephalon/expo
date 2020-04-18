package expo.modules.updates.launcher;

import expo.modules.updates.db.entity.UpdateEntity;
import expo.modules.updates.db.enums.UpdateStatus;
import expo.modules.updates.loader.EmbeddedLoader;
import expo.modules.updates.manifest.Manifest;

import java.util.ArrayList;
import java.util.List;

/**
 * Simple Update selection policy which chooses
 * the newest update (based on commit time) out
 * of all the possible stored updates.
 *
 * If multiple updates have the same (most
 * recent) commit time, this class will return
 * the earliest one in the list.
 */
public class SelectionPolicyNewest implements SelectionPolicy {

  private String mRuntimeVersion;
  private Manifest mEmbeddedManifest;

  public SelectionPolicyNewest(String runtimeVersion, Manifest embeddedManifest) {
    mRuntimeVersion = runtimeVersion;
    mEmbeddedManifest = embeddedManifest;
  }

  @Override
  public UpdateEntity selectUpdateToLaunch(List<UpdateEntity> updates) {
    UpdateEntity updateToLaunch = null;
    for (UpdateEntity update : updates) {
      if (!mRuntimeVersion.equals(update.runtimeVersion)) {
        continue;
      }
      // We can only run an update marked as embedded if it's actually the update embedded in the
      // current binary. We might have an older update from a previous binary still listed as
      // "EMBEDDED" in the database so we need to do this check.
      if (update.status == UpdateStatus.EMBEDDED) {
        if (!mEmbeddedManifest.getUpdateEntity().id.equals(update.id)) {
          continue;
        }
      }
      if (updateToLaunch == null || updateToLaunch.commitTime.before(update.commitTime)) {
        updateToLaunch = update;
      }
    }
    return updateToLaunch;
  }

  @Override
  public List<UpdateEntity> selectUpdatesToDelete(List<UpdateEntity> updates, UpdateEntity launchedUpdate) {
    if (launchedUpdate == null) {
      return new ArrayList<>();
    }

    List<UpdateEntity> updatesToDelete = new ArrayList<>();
    for (UpdateEntity update : updates) {
      if (update.commitTime.before(launchedUpdate.commitTime)) {
        updatesToDelete.add(update);
      }
    }
    return updatesToDelete;
  }

  @Override
  public boolean shouldLoadNewUpdate(UpdateEntity newUpdate, UpdateEntity launchedUpdate) {
    if (launchedUpdate == null) {
      return true;
    }
    if (newUpdate == null) {
      return false;
    }
    return newUpdate.commitTime.after(launchedUpdate.commitTime);
  }
}
