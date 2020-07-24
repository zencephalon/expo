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
declare type NamedStyles<T> = {
    [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};
declare const StyleSheet: {
    /**
     * Creates a StyleSheet style reference from the given object.
     */
    create<T extends NamedStyles<T> | NamedStyles<any>>(styles: T | NamedStyles<T>): T;
    flatten<T_1>(style?: import("react-native").StyleProp<T_1>): T_1 extends (infer U)[] ? U : T_1;
    compose<T_2>(style1: false | T_2 | import("react-native").RegisteredStyle<T_2> | import("react-native").RecursiveArray<false | T_2 | import("react-native").RegisteredStyle<T_2> | null | undefined> | import("react-native").StyleProp<T_2>[] | null | undefined, style2: false | T_2 | import("react-native").RegisteredStyle<T_2> | import("react-native").RecursiveArray<false | T_2 | import("react-native").RegisteredStyle<T_2> | null | undefined> | import("react-native").StyleProp<T_2>[] | null | undefined): import("react-native").StyleProp<T_2>;
    setStyleAttributePreprocessor(property: string, process: (nextProp: any) => any): void;
    hairlineWidth: number;
    absoluteFillObject: NativeStyleSheet.AbsoluteFillStyle;
    absoluteFill: import("react-native").RegisteredStyle<NativeStyleSheet.AbsoluteFillStyle>;
};
export { StyleSheet };
