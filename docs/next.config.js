const { copySync, removeSync } = require('fs-extra');
const merge = require('lodash/merge');
const { join } = require('path');
const semver = require('semver');
const composePlugins = require('next-compose-plugins');

const headings = require('./common/headingsMdPlugin');
const { version } = require('./package.json');

// To generate a sitemap, we need context about the supported versions and navigational data
const createSitemap = require('./scripts/create-sitemap');
const navigation = require('./constants/navigation-data');
const versions = require('./constants/versions');

// copy versions/v(latest version) to versions/latest
// (Next.js only half-handles symlinks)
const vLatest = join('pages', 'versions', `v${version}/`);
const latest = join('pages', 'versions', 'latest/');
removeSync(latest);
copySync(vLatest, latest);

module.exports = composePlugins([withMdx, withPrevalConstants], {
  trailingSlash: true,
  // Create a map of all pages to export
  async exportPathMap(defaultPathMap, { dev, outDir }) {
    if (dev) {
      return defaultPathMap;
    }
    const pathMap = Object.assign(
      ...Object.entries(defaultPathMap).map(([pathname, page]) => {
        if (pathname.match(/\/v[1-9][^\/]*$/)) {
          // ends in "/v<version>"
          pathname += '/index.html'; // TODO: find out why we need to do this
        }
        if (pathname.match(/unversioned/)) {
          return {};
        } else {
          // hide versions greater than the package.json version number
          const versionMatch = pathname.match(/\/v(\d\d\.\d\.\d)\//);
          if (versionMatch && versionMatch[1] && semver.gt(versionMatch[1], version)) {
            return {};
          }
          return { [pathname]: page };
        }
      })
    );
    // Create a sitemap for crawlers like Google and Algolia
    createSitemap({
      pathMap,
      domain: 'https://docs.expo.io',
      output: join(outDir, 'sitemap.xml'),
      // Some of the search engines only track the first N items from the sitemap,
      // this makes sure our starting and general guides are first, and API index last (in order from new to old)
      pathsPriority: [
        ...navigation.startingDirectories,
        ...navigation.generalDirectories,
        ...versions.VERSIONS.map(version => `versions/${version}`),
      ],
      // Some of our pages are "hidden" and should not be added to the sitemap
      pathsHidden: navigation.previewDirectories,
    });
    return pathMap;
  },
});

/**
 * Add MDX support to Next using our custom loader and plugins.
 * The `./common/md-loader` is used to add frontmatter and the default wrapper.
 * For the TOC we use a custom headings remark plugin.
 */
function withMdx(nextConfig = {}) {
  return Object.assign({}, nextConfig, {
    pageExtensions: [...nextConfig.pageExtensions, 'md', 'mdx'],
    webpack(config, options) {
      config.module.rules.push({
        test: /.mdx?$/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: '@mdx-js/loader',
            options: { remarkPlugins: [headings] },
          },
          join(__dirname, './common/md-loader'),
        ],
      });

      // Fix inline or browser MDX usage
      // See: https://mdxjs.com/getting-started/webpack#running-mdx-in-the-browser
      config.node = { fs: 'empty' };

      return typeof nextConfig.webpack === 'function'
        ? nextConfig.webpack(config, options)
        : config;
    },
  });
}

/**
 * Add preval support for `constants/*` only and move it the output to `.next/preval` cache.
 * It's to prevent over-usage and separate the cache to allow manually invalidation.
 *
 * @see https://github.com/kentcdodds/babel-plugin-preval/issues/19
 */
function withPrevalConstants(nextConfig = {}) {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: /.jsx?$/,
        include: [join(__dirname, 'constants')],
        use: merge({}, options.defaultLoaders.babel, {
          options: {
            // Keep this path in sync with package.json and other scripts that clear the cache
            cacheDirectory: '.next/preval',
            plugins: ['preval'],
          },
        }),
      });

      return typeof nextConfig.webpack === 'function'
        ? nextConfig.webpack(config, options)
        : config;
    },
  });
}
