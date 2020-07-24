/***
 * Copyright (c) Expo team.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { ClassAttributes, ComponentProps, ComponentType } from 'react';
import { AccessibilityRole, StyleProp, Text as NativeText } from 'react-native';
import { TextStyle } from './TextStyles';
declare type NativeTextProps = ComponentProps<typeof NativeText> & ClassAttributes<typeof NativeText>;
declare type WebTextProps = {
    style?: StyleProp<TextStyle>;
    /**
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
     *
     * @platform web
     */
    tabIndex?: number;
    /**
     * Accessibility Role tells a person using either VoiceOver on iOS or TalkBack on Android the type of element that is focused on.
     */
    accessibilityRole?: 'listitem' | AccessibilityRole;
};
declare type TextProps = Omit<NativeTextProps, 'style' | 'accessibilityRole'> & WebTextProps;
declare const Text: ComponentType<TextProps>;
export { Text, TextStyle, TextProps };
