const { join } = require('path');
const { version } = require('./package.json');

// Update the `pages/versions/latest` symbolic link
require('./scripts/latest-version').updateLatestLink(version)

module.exports = {
  trailingSlash: true,
  // Rather than use `@zeit/next-mdx`, we replicate it
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  webpack: (config, options) => {
    // Create a copy of the babel loader, to separate MDX and Next/Preval caches
    const babelMdxLoader = {
      ...options.defaultLoaders.babel,
      options: {
        ...options.defaultLoaders.babel.options,
        cacheDirectory: 'node_modules/.cache/babel-mdx-loader',
      },
    };
    config.module.rules.push({
      test: /.mdx?$/, // load both .md and .mdx files
      use: [babelMdxLoader, '@mdx-js/loader', join(__dirname, './common/md-loader')],
    });
    config.node = {
      fs: 'empty',
    };
    return config;
  },
};
