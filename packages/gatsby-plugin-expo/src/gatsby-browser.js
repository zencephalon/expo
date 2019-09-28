import withExpoRoot from 'expo/build/launch/withExpoRoot';
import * as React from 'react';
import { AppRegistry } from 'react-native';

function replaceHydrateFunction() {
  return (element, rootTag, callback) => {
    const App = withExpoRoot(() => element);

    const RootComponent = props => <App exp={{}} {...props} />;

    AppRegistry.registerComponent('main', () => RootComponent);
    AppRegistry.runApplication('main', { initialProps: {}, rootTag, callback });
  };
}

exports.replaceHydrateFunction = replaceHydrateFunction;
