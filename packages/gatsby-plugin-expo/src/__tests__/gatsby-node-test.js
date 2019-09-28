const {
  resolvableExtensions,
  onCreateBabelConfig,
  onCreateWebpackConfig,
} = require(`../gatsby-node`);

describe(`resolvableExtensions`, () => {
  it(`returns the correct resolvable extensions`, () => {
    expect(resolvableExtensions()).toMatchSnapshot();
  });
});

describe(`onCreateBabelConfig`, () => {
  it(`sets the correct babel preset`, () => {
    const actions = { setBabelPreset: jest.fn() };
    const options = {
      // TODO: Bacon: try to pass in native props too
    };
    onCreateBabelConfig({ actions }, options);
    expect(actions.setBabelPreset).toHaveBeenCalledWith({
      name: expect.stringContaining('babel-preset-expo'),
      options,
    });
  });
});

describe(`onCreateWebpackConfig`, () => {
  it(`invokes the correct webpack config props`, () => {
    const actions = { setWebpackConfig: jest.fn() };
    const jsLoader = {};
    const getConfig = jest.fn();
    onCreateWebpackConfig({ actions, getConfig });
    expect(actions.setWebpackConfig).toHaveBeenCalled();
    expect(getConfig).toHaveBeenCalled();
  });
});
