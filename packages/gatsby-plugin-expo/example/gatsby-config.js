module.exports = {
  plugins: [
    `gatsby-plugin-expo`,
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      options: {
        production: true,
        openAnalyzer: false,
        analyzerMode: 'static',
      },
    },
  ],
};
