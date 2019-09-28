<!-- Title -->
<h1 align="center">
👋 Welcome to <br><code>gatsby-plugin-expo</code>
</h1>

<!-- Header -->

<p align="center">
    <b>Adds Unimodule support to Gatsby</b>
    <br/>
    <br/>
    <a aria-label="Circle CI" href="https://circleci.com/gh/expo/expo/tree/master">
        <img alt="Circle CI" src="https://flat.badgen.net/circleci/github/expo/expo?label=Circle%20CI&labelColor=555555&icon=circleci">
    </a>
</p>

- Uses [`babel-preset-expo`](https://github.com/expo/expo/tree/master/packages/babel-preset-expo#readme) for the babel preset. This will ensure that your web code is being transpiled the same as your web code (important for cross-bundling between Metro and Webpack) and it will add optimal tree-shaking for unused platform code.
- Wraps the default Webpack config with [`withUnimodules`](https://github.com/expo/expo-cli/blob/master/packages/webpack-config/withUnimodules.js) from [`@expo/webpack-config`](https://github.com/expo/expo-cli/tree/master/packages/webpack-config) and disables the default font loading in favor of Gatsby's font loading.
- Unify Error handling across native / web projects by using the entry point in the [`expo`](https://github.com/expo/expo/tree/master/packages/expo) package.
- Adds support for platform extensions like `.web.js`
- **Experimental**: Exports static styles for SSR.

---

**Table of Contents**

- [🏁 Setup](#🏁-setup)
- [⚽️ Usage](#⚽️-usage)
- [🤝 Related](#🤝-related)
- [🚘 License](#🚘-license)

<!-- Body -->

## 🏁 Setup

1. Install `gatsby-plugin-expo` in your project.

```sh
yarn add gatsby-plugin-expo react-native-web @unimodules/core @unimodules/react-native-adapter expo
```

2. To use Expo modules you'll want to install the core libraries.

```sh
yarn add expo-asset expo-constants expo-file-system expo-font
```

3. Ensure your project has an `app.json`. This is the universal config for Expo projects, in the future this won't be a requirement.

```json
{
  "expo": {
    "entryPoint": "/"
  }
}
```

4. Add the plugin to your `gatsby-config.js`.

```ts
module.exports = {
  plugins: [`gatsby-plugin-expo`],
};
```

## ⚽️ Usage

You can use any React Native code in your project!

```tsx
// Some universal primitives
import { View, Text, Image } from 'react-native';

export default () => (
  <View>
    <Image source={{ uri: '...' }} />
    <Text>Hello World!</Text>
  </View>
);
```

Then you can spice things up and start using cutting-edge browser functionality

```tsx
// Use a camera in your app!
// `yarn add expo-camera`

import { Camera } from 'expo-camera';

export default () => <Camera />;
```

All Unimodules or other modules maintained by Expo or Software Mansion should work:

```tsx
// Use gestures in your app
// `yarn add react-native-gesture-handler`

import { PanGestureHandler } from 'react-native-gesture-handler';

export default () => <PanGestureHandler minDist={10} />;
```

## 🤝 Related

- [`gatsby-plugin-react-native-web`](https://github.com/slorber/gatsby-plugin-react-native-web): Created by [**Sebastien Lorber**](https://sebastienlorber.com)

## 🚘 License

The Expo source code is made available under the [MIT license](LICENSE). Some of the dependencies are licensed differently, with the BSD license, for example.

<!-- Footer -->

---

<p>
    <a aria-label="sponsored by expo" href="http://expo.io">
        <img src="https://img.shields.io/badge/SPONSORED%20BY%20EXPO-4630EB.svg?style=for-the-badge" target="_blank" />
    </a>
    <a aria-label="gatsby-plugin-expo is free to use" href="../../LICENSE" target="_blank">
        <img align="right" alt="License: MIT" src="https://img.shields.io/badge/License-MIT-success.svg?style=for-the-badge&color=33CC12" target="_blank" />
    </a>
</p>
