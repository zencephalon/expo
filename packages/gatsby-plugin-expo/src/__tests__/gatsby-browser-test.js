const { replaceHydrateFunction } = require(`../gatsby-browser`);

describe(`replaceHydrateFunction`, () => {
  it(`invokes the callback`, () => {
    const callback = jest.fn();
    replaceHydrateFunction({}, {}, callback);

    expect(callback).toBeCalled();
  });
});
