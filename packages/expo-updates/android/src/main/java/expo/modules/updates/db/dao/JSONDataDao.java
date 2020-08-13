package expo.modules.updates.db.dao;

import java.util.Date;
import java.util.List;

import javax.annotation.Nullable;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Transaction;
import expo.modules.updates.db.entity.JSONDataEntity;

@Dao
public abstract class JSONDataDao {
  /**
   * for private use only
   * must be marked public for Room
   * so we use the underscore to discourage use
   */
  @Query("SELECT * FROM json_data WHERE `key` = :key ORDER BY last_updated DESC LIMIT 1;")
  public abstract List<JSONDataEntity> _loadJSONDataForKey(String key);

  @Insert
  public abstract void _insertJSONData(JSONDataEntity jsonDataEntity);

  @Query("DELETE FROM json_data WHERE `key` = :key;")
  public abstract void _deleteJSONDataForKey(String key);

  /**
   * for public use
   */
  public @Nullable String loadJSONValueForKey(String key) {
    List<JSONDataEntity> rows = _loadJSONDataForKey(key);
    if (rows == null || rows.size() == 0) {
      return null;
    }
    return rows.get(0).value;
  }

  @Transaction
  public void setJSONValueForKey(String key, String value) {
    _deleteJSONDataForKey(key);
    _insertJSONData(new JSONDataEntity(key, value, new Date()));
  }
}
