import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import MapView from './lib';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

function log(eventName, e) {
  console.log(eventName, e.nativeEvent);
}

export default class MarkerTypes extends React.Component {
  static propTypes = {
    provider: MapView.ProviderPropType,
  };
  state = {
    a: {
      latitude: LATITUDE + SPACE,
      longitude: LONGITUDE + SPACE,
    },
  };
  render() {
    return (
      <View style={styles.container} accessible>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <MapView.Marker
            testID="marker"
            coordinate={this.state.a}
            onSelect={log.bind(this, 'onSelect')}
            onDrag={log.bind(this, 'onDrag')}
            onDragStart={log.bind(this, 'onDragStart')}
            onDragEnd={log.bind(this, 'onDragEnd')}
            onPress={log.bind(this, 'onPress')}
            draggable
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
