/***
 * Copyright (c) Expo team.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TextStyle } from 'expo-style-sheet/build/TextStyles';
import { ClassAttributes, ComponentProps, ComponentType } from 'react';
import { AccessibilityRole, StyleProp, Text as NativeText } from 'react-native';

type NativeTextProps = ComponentProps<typeof NativeText> & ClassAttributes<typeof NativeText>;

type TextProps = Omit<NativeTextProps, 'style' | 'accessibilityRole'> & {
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
  /**
   *
   * @platform web
   */
  href?: string;
};

const Text = NativeText as ComponentType<TextProps>;

export { Text, TextStyle, TextProps };
