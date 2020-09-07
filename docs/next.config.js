const { copySync, removeSync } = require('fs-extra');
const { join } = require('path');

const { version } = require('./package.json');

// copy versions/v(latest version) to versions/latest
// (Next.js only half-handles symlinks)
const vLatest = join('pages', 'versions', `v${version}/`);
const latest = join('pages', 'versions', 'latest/');
removeSync(latest);
copySync(vLatest, latest);

module.exports = {
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  webpack: (config, options) => {
    // Add scoped preval support for constants
    config.module.rules.push({
      test: /.jsx?$/,
      include: [join(__dirname, './constants')],
      use: {
        ...options.defaultLoaders.babel,
        options: {
          ...options.defaultLoaders.babel.options,
          cacheDirectory: join(options.config.distDir, 'preval'),
          plugins: ['preval'],
        },
      },
    });

    // Add support for MDX rendering
    config.node = { fs: 'empty' };
    config.module.rules.push({
      test: /.mdx?$/, // load both .md and .mdx files
      use: [
        options.defaultLoaders.babel,
        '@mdx-js/loader',
        join(__dirname, './common/md-loader'),
      ],
    });

    return config;
  },
};
