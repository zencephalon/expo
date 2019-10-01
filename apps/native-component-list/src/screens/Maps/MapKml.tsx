import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -18.9193508;
const LONGITUDE = -48.2830592;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const KML_FILE = 'https://pastebin.com/raw/jAzGpq1F';

export default class MapKml extends React.Component {
  static propTypes = {
    provider: MapView.ProviderPropType,
  };
  state = {
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  };

  onKmlReady = () => {
    this.map.fitToElements(true);
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          kmlSrc={KML_FILE}
          onKmlReady={this.onKmlReady}>
          <Marker coordinate={this.state.region} title="Test" description="Test" />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollview: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  map: {
    width,
    height,
  },
});
