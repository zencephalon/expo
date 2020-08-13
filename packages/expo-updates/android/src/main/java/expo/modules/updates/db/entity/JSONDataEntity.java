package expo.modules.updates.db.entity;

import java.util.Date;

import androidx.annotation.NonNull;
import androidx.room.ColumnInfo;
import androidx.room.Entity;

@Entity(tableName = "json_data")
public class JSONDataEntity {
  @NonNull
  public String key;

  @NonNull
  public String value;

  @ColumnInfo(name = "last_updated")
  @NonNull
  public Date lastUpdated;

  public JSONDataEntity(String key, String value, Date lastUpdated) {
    this.key = key;
    this.value = value;
    this.lastUpdated = lastUpdated;
  }
}
