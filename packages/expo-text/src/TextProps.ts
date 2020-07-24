/***
 * Copyright (c) Expo team.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TextStyle } from 'expo-style-sheet/build/TextStyles';
import { ViewProps } from 'expo-view';
import { AccessibilityRole, StyleProp } from 'react-native';

// Web-specific TextProps
type WebTextProps = {
  /**
   *
   * @platform web
   * @unstable
   */
  href?: string;
};

// Modify any TextProps that have more functionality on web
type ModifiedNativeTextProps = Omit<ViewProps, 'style' | 'selectable' | 'accessibilityRole'> & {
  style?: StyleProp<TextStyle>;
  /**
   * Accessibility Role tells a person using either VoiceOver on iOS or TalkBack on Android the type of element that is focused on.
   */
  accessibilityRole?: 'listitem' | AccessibilityRole;
  /**
   * Lets the user select text, to use the native copy and paste functionality.
   *
   * @platform web, android
   */
  selectable?: boolean;
};

export type TextProps = WebTextProps & ModifiedNativeTextProps;
