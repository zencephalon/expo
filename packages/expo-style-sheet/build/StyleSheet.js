/***
 * Copyright (c) Expo team.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { StyleSheet as NativeStyleSheet } from 'react-native';
export * from './AnimationStyles';
export * from './GridStyles';
export * from './InteractionStyles';
export * from './TransformStyles';
export * from './TransitionStyles';
export * from './TextStyles';
const StyleSheet = {
    ...NativeStyleSheet,
    /**
     * Creates a StyleSheet style reference from the given object.
     */
    create(styles) {
        // @ts-ignore
        return NativeStyleSheet.create(styles);
    },
};
export { StyleSheet };
//# sourceMappingURL=StyleSheet.js.map