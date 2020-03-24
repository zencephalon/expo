import { ImageTestGroup } from '../types';
import AndroidTests from './android';
import AppearanceTests from './appearance';
import BlurTests from './blur';
import BorderTests from './borders';
import EventTests from './events';
import IOSTests from './ios';
import ShadowsTests from './shadows';
import SourcesTests from './sources';

const tests: ImageTestGroup = {
  name: 'Image',
  tests: [
    AppearanceTests,
    BorderTests,
    ShadowsTests,
    BlurTests,
    SourcesTests,
    EventTests,
    IOSTests,
    AndroidTests,
  ],
};

export default tests;
