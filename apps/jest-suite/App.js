import { AppLoading, Asset, BlurView } from 'expo';

import assert from 'assert';
import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useScreens } from 'react-native-screens';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Assets as StackNavigatorAssets } from 'react-navigation-stack';

import HomeScreen from './screens/HomeScreen';
import JasmineLogReporter from './testing/JasmineLogReporter';
import { createTestEnvironmentAsync } from './testing/environment';

useScreens();

async function loadTestsAsync() {
  // This is an async function even though we don't await within it since when we replace requires
  // with dynamic imports we will need to await them
  assert(global.describe, `Jasmine must be installed before loading the tests`);

  let JSCTests = require('./tests/JSC');
  describe(JSCTests.name, JSCTests.describe);
}

export default class App extends React.Component {
  _isMounted = false;
  state = {
    isReady: false,
    jasmineEnv: null,
  };

  componentDidMount() {
    this._isMounted = true;

    Promise.all([
      // Set up the test environment
      createTestEnvironmentAsync()
        .then(({ jasmineEnv, jasmineInterface }) => {
          jasmineEnv.addReporter(new JasmineLogReporter());
          Object.assign(global, jasmineInterface);
          this.setState({ jasmineEnv });
        })
        .then(() => loadTestsAsync()),

      // Preload assets
      Asset.loadAsync(StackNavigatorAssets),
    ]).finally(() => {
      if (!this._isMounted) {
        return;
      }
      this.setState({ isReady: true });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container} testID="test_suite">
        <StatusBar barStyle="light-content" />
        <Navigator screenProps={{ jasmineEnv: this.state.jasmineEnv }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  headerBackground: {
    flexGrow: 1,
  },
});

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: 'transparent' },
      headerTintColor: '#fff',
      headerTransparent: true,
      headerBackground: <BlurView style={styles.headerBackground} tint="dark" intensity={100} />,
    },
  }
);

const Navigator = createAppContainer(RootStack);
