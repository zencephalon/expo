import { ImageTestGroup } from '../types';
import AndroidTests from './android';
import AppearanceTests from './appearance';
import EventTests from './events';
import IOSTests from './ios';
import SourcesTests from './sources';
import SVGTests from './svg';

const tests: ImageTestGroup = {
  name: 'Image',
  tests: [AppearanceTests, SourcesTests, EventTests, IOSTests, AndroidTests, SVGTests],
};

export default tests;
