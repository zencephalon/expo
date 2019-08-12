import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import MapView, { Marker, ProviderPropType } from './lib';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const region = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};
function DefaultMarkers({ provider }) {

  const [
    markers,
    setMarkers
  ]: any[] = React.useState([]);

  return (
    <View style={styles.container}>
      <MapView
        provider={provider}
        style={styles.map}
        initialRegion={region}
        onPress={({ nativeEvent }: any) => 
        setMarkers([
            ...markers,
            {
              coordinate: nativeEvent.coordinate,
              key: id++,
              color: randomColor(),
            },
          ])}>
        {markers.map((marker: any) => (
          <Marker key={marker.key} coordinate={marker.coordinate} pinColor={marker.color} />
        ))}
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setMarkers([])} style={styles.bubble}>
          <Text>Tap to create a marker of random color</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

DefaultMarkers.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default DefaultMarkers;
