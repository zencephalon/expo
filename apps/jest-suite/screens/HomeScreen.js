import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, ScrollView, SectionList } from 'react-navigation';

// Can run tests with this.props.screenProps.jasmineEnv
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Test Suite',
    // headerStyle: { backgroundColor: '#1e1e1e' },
  };

  componentDidMount() {
    let { jasmineEnv } = this.props.screenProps;
    console.log(jasmineEnv.topSuite().children[0].description);

    jasmineEnv.execute();
  }

  render() {
    return (
      <ScrollView>
        <SafeAreaView>
          <Text style={{ fontWeight: '400', fontSize: 50 }}>hi</Text>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
