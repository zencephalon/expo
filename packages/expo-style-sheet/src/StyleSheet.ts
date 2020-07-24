/***
 * Copyright (c) Expo team.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ImageStyle, StyleSheet as NativeStyleSheet, ViewStyle } from 'react-native';

import { TextStyle } from './TextStyles';

export * from './AnimationStyles';
export * from './GridStyles';
export * from './InteractionStyles';
export * from './TransformStyles';
export * from './TransitionStyles';
export * from './TextStyles';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

const StyleSheet = {
  ...NativeStyleSheet,
  /**
   * Creates a StyleSheet style reference from the given object.
   */
  create<T extends NamedStyles<T> | NamedStyles<any>>(styles: T | NamedStyles<T>): T {
    // @ts-ignore
    return NativeStyleSheet.create(styles);
  },
};

export { StyleSheet };
