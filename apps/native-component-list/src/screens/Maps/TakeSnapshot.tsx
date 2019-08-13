import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import flagBlueImg from './assets/flag-blue.png';
import flagPinkImg from './assets/flag-pink.png';
import MapView, { Marker, ProviderPropType } from './lib';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

export default function TakeSnapshot({ provider }) {

  const [
    mapSnapshot,
    setSnapshot
  ] = React.useState(null);

  let map: any;

  function takeSnapshot() {
    map.takeSnapshot(
      300,
      300,
      {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01 * ASPECT_RATIO,
      },
      (err, data) => {
        if (err) throw err; //console.log(err);
        console.log('got image: ', data)
        setSnapshot(data);
      }
    );
  }

    return (
      <View style={styles.container}>
        <MapView
          provider={provider}
          ref={ref => map = ref}
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <Marker
            coordinate={{
              latitude: LATITUDE + SPACE,
              longitude: LONGITUDE + SPACE,
            }}
            centerOffset={{ x: -18, y: -60 }}
            anchor={{ x: 0.69, y: 1 }}
            image={flagBlueImg}
          />
          <Marker
            coordinate={{
              latitude: LATITUDE - SPACE,
              longitude: LONGITUDE - SPACE,
            }}
            centerOffset={{ x: -42, y: -60 }}
            anchor={{ x: 0.84, y: 1 }}
            image={flagPinkImg}
          />
        </MapView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => takeSnapshot()}
            style={[styles.bubble, styles.button]}>
            <Text>Take snapshot</Text>
          </TouchableOpacity>
        </View>
        {(mapSnapshot != null) && (
          <TouchableOpacity
            style={[styles.container, styles.overlay]}
            onPress={() => setSnapshot(null)}>
            <Image
              source={{ uri: mapSnapshot!.uri }}
              style={{ width: 300, height: 300 }}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  
}

TakeSnapshot.propTypes = {
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
  button: {
    width: 140,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
});
