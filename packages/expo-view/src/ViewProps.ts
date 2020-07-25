/***
 * Copyright (c) Expo team.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ViewStyle } from 'expo-style-sheet/build/ViewStyles';
import { ClassAttributes, ComponentProps } from 'react';
import {
  AccessibilityRole,
  NativeSyntheticEvent,
  GestureResponderEvent,
  StyleProp,
  View as NativeView,
} from 'react-native';

type NativeViewProps = ComponentProps<typeof NativeView> & ClassAttributes<typeof NativeView>;

type AnyResponderEvent = NativeSyntheticEvent<any>;

type ViewInteractionProps = {
  // mouse
  onClick?: (e: AnyResponderEvent) => void;
  onClickCapture?: (e: AnyResponderEvent) => void;
  onContextMenu?: (e: AnyResponderEvent) => void;
  // keyboard
  onKeyDown?: (e: AnyResponderEvent) => void;
  onKeyUp?: (e: AnyResponderEvent) => void;
  // unstable
  onMouseDown?: (e: AnyResponderEvent) => void;
  onMouseEnter?: (e: AnyResponderEvent) => void;
  onMouseLeave?: (e: AnyResponderEvent) => void;
  onMouseMove?: (e: AnyResponderEvent) => void;
  onMouseOver?: (e: AnyResponderEvent) => void;
  onMouseOut?: (e: AnyResponderEvent) => void;
  onMouseUp?: (e: AnyResponderEvent) => void;
  onScroll?: (e: AnyResponderEvent) => void;
  onTouchCancelCapture?: (e: GestureResponderEvent) => void;
  onTouchMoveCapture?: (e: GestureResponderEvent) => void;
  onTouchStartCapture?: (e: GestureResponderEvent) => void;
  onWheel?: (e: AnyResponderEvent) => void;
};

// Web-specific ViewProps
export type WebViewProps = ViewInteractionProps & {
  /**
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
   *
   * @platform web
   */
  tabIndex?: number;
  /**
   * @platform web
   * @unstable
   */
  rel?: string;
  /**
   * @platform web
   * @unstable
   */
  target?: string;
  /**
   * @platform web
   * @unstable
   */
  dataSet?: Record<string, any>;
};

// Modify any TextProps that have more functionality on web
type ModifiedNativeViewProps = Omit<
  NativeViewProps,
  'style' | 'selectable' | 'accessibilityRole'
> & {
  style?: StyleProp<ViewStyle>;
  /**
   * Accessibility Role tells a person using either VoiceOver on iOS or TalkBack on Android the type of element that is focused on.
   */
  accessibilityRole?:
    | 'list'
    | 'listitem'
    | 'complementary'
    | 'contentinfo'
    | 'region'
    | 'navigation'
    | 'main'
    | 'article'
    | 'banner'
    | AccessibilityRole;

  /**
   * Lets the user select text, to use the native copy and paste functionality.
   *
   * @platform web, android
   */
  selectable?: boolean;
};

export type ViewProps = WebViewProps & ModifiedNativeViewProps;
