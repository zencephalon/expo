/***
 * Copyright (c) Expo team.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TextStyle } from 'expo-style-sheet/build/TextStyles';
import { ViewProps } from 'expo-view';
import { TextPropsIOS, TextPropsAndroid, TextProps as NativeTextProps, StyleProp } from 'react-native';
declare type TextPropsWeb = {
    /**
     *
     * @platform web
     * @unstable
     */
    href?: string;
};
declare type ModifiedNativeTextProps = Omit<ViewProps, 'style'> & TextPropsIOS & Omit<TextPropsAndroid, 'selectable'> & {
    style?: StyleProp<TextStyle>;
    /**
     * Lets the user select text, to use the native copy and paste functionality.
     *
     * @platform web, android
     */
    selectable?: boolean;
} & Pick<NativeTextProps, 'allowFontScaling' | 'ellipsizeMode' | 'lineBreakMode' | 'numberOfLines' | 'onPress' | 'onLongPress' | 'maxFontSizeMultiplier'>;
export declare type TextProps = TextPropsWeb & ModifiedNativeTextProps;
export {};
