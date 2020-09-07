import * as React from 'react';

export const SluggerContext = React.createContext();

const withSlugger = Component => props => (
  <SluggerContext.Consumer>
    {sluggerInstance => <Component slugger={sluggerInstance} {...props} />}
  </SluggerContext.Consumer>
);

export default withSlugger;
