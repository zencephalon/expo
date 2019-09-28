const { replaceRenderer } = require(`../gatsby-ssr`);

describe(`replaceRenderer`, () => {
  it(`invokes basic`, () => {
    const replaceBodyHTMLString = jest.fn();
    const setHeadComponents = jest.fn();

    replaceRenderer({ bodyComponent: {}, replaceBodyHTMLString, setHeadComponents });

    expect(replaceBodyHTMLString).toBeCalled();
    expect(setHeadComponents).toBeCalled();
  });
});
