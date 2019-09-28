import withExpoRoot from 'expo/build/launch/withExpoRoot';
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { AppRegistry } from 'react-native';

function replaceRenderer({ bodyComponent, replaceBodyHTMLString, setHeadComponents }) {
  const App = withExpoRoot(() => bodyComponent);

  const RootComponent = props => <App exp={{}} {...props} />;

  AppRegistry.registerComponent('main', () => RootComponent);
  const { element, getStyleElement } = AppRegistry.getApplication('main');

  const html = ReactDOMServer.renderToString(element);
  const styleElement = getStyleElement();

  replaceBodyHTMLString(html);
  setHeadComponents([styleElement]);
}

exports.replaceRenderer = replaceRenderer;
