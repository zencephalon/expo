/* global __dirname */
const withUnimodules = require('@expo/webpack-config/withUnimodules');
// TODO: Bacon: export from @expo/webpack-config/utils
const { getModuleFileExtensions } = require('@expo/webpack-config/webpack/utils/config');

const resolvableExtensions = () => getModuleFileExtensions('web');

function onCreateBabelConfig({ actions }, options) {
  actions.setBabelPreset({
    name: require.resolve(`babel-preset-expo`),
    options,
  });
}

function onCreateWebpackConfig({ actions, getConfig }) {
  const gatsbyConfig = getConfig();

  actions.replaceWebpackConfig(
    withUnimodules(
      gatsbyConfig,
      // TODO: Bacon: infer in @expo/webpack-config
      { projectRoot: __dirname },
      // TODO: Bacon: infer in @expo/webpack-config
      { supportsFontLoading: false }
    )
  );
}

exports.resolvableExtensions = resolvableExtensions;
exports.onCreateBabelConfig = onCreateBabelConfig;
exports.onCreateWebpackConfig = onCreateWebpackConfig;
