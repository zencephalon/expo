import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, ProviderPropType } from './lib';
// import { GOOGLE_MAPS_API_LOCAL } from '../../../.expo/secrets';
const GOOGLE_MAPS_API_LOCAL = '';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class StaticMap extends React.Component<any, any> {
  static propTypes = {
    provider: ProviderPropType,
  };

  state = {
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={StyleSheet.absoluteFill} contentContainerStyle={styles.scrollview}>
          <TextList>{topText}</TextList>
          <MapView
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_LOCAL}&v=3.exp&libraries=geometry,drawing,places`}
            provider={this.props.provider}
            style={styles.map}
            scrollEnabled={false}
            zoomEnabled={false}
            pitchEnabled={false}
            rotateEnabled={false}
            initialRegion={this.state.region}>
            <Marker
              title="This is a title"
              description="This is a description"
              coordinate={this.state.region}
            />
          </MapView>
          <TextList>{bottomText}</TextList>
        </ScrollView>
      </View>
    );
  }
}

const TextList = ({ children }: any) => (
  <>
    {children.map((item: string, index: number) => (
      <Text key={`-${index}`}>{item}</Text>
    ))}
  </>
);

const topText = ['Clicking', 'and', 'dragging', 'the', 'map', 'will', 'cause', 'the'];

const bottomText = [
  'parent',
  'ScrollView',
  'to',
  'scroll.',
  'When',
  'using',
  'a Google',
  'Map',
  'this only',
  'works',
  'if you',
  'disable:',
  'scroll,',
  'zoom,',
  'pitch,',
  'rotate.',
  '...',
  'It',
  'would',
  'be',
  'nice',
  'to',
  'have',
  'an',
  'option',
  'that',
  'still',
  'allows',
  'zooming.',
];

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollview: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  map: {
    width: 250,
    height: 250,
  },
});

export default StaticMap;
