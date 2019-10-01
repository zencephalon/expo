import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import MapView, { Callout, Marker, ProviderPropType } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function OnPoiClick({ provider }) {

  const [
    region,
  ] = React.useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [poi, setPoi] = React.useState(null);
  
  return (
      <MapView
        provider={provider}
        style={styles.map}
        initialRegion={region}
        onPoiClick={({ nativeEvent }) => setPoi(nativeEvent)}>
        {poi && (
          <Marker coordinate={poi.coordinate}>
            <Callout>
              <View>
                <Text>Place Id: {poi.placeId}</Text>
                <Text>Name: {poi.name}</Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
    
  );

}

OnPoiClick.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default OnPoiClick;
