import {
  AnimationStyles,
  GridStyles,
  InteractionStyles,
  TransformStyles,
  TransitionStyles,
} from 'expo-style-sheet';
import { ClassAttributes, ComponentProps, ComponentType } from 'react';
import {
  AccessibilityRole,
  StyleProp,
  View as NativeView,
  ViewStyle as NativeViewStyle,
} from 'react-native';

type NativeViewProps = ComponentProps<typeof NativeView> & ClassAttributes<typeof NativeView>;

/**
 * https://baconbrix.gitbook.io/react-native-web/primitives/view
 */
export interface WebViewStyle {
  /** @platform web */
  backdropFilter?: string;
  /** @platform web */
  backgroundAttachment?: string;
  /** @platform web */
  backgroundBlendMode?: string;
  /** @platform web */
  backgroundClip?: string;
  /** @platform web */
  backgroundImage?: string;
  /** @platform web */
  backgroundOrigin?: 'border-box' | 'content-box' | 'padding-box';
  /** @platform web */
  backgroundPosition?: string;
  /** @platform web */
  backgroundRepeat?: string;
  /** @platform web */
  backgroundSize?: string;
  /** @platform web */
  boxShadow?: string;
  /** @platform web */
  boxSizing?: string;
  /** @platform web */
  clip?: string;
  /** @platform web */
  filter?: string;
  /** @platform web */
  outline?: string;
  /** @platform web */
  outlineColor?: string;
  /** @platform web */
  overflowX?: string;
  /** @platform web */
  overflowY?: string;
  /** @platform web */
  overscrollBehavior?: 'auto' | 'contain' | 'none';
  /** @platform web */
  overscrollBehaviorX?: 'auto' | 'contain' | 'none';
  /** @platform web */
  overscrollBehaviorY?: 'auto' | 'contain' | 'none';
  /** @platform web */
  visibility?: string;
}

export type ViewStyle = NativeViewStyle &
  WebViewStyle &
  AnimationStyles &
  TransitionStyles &
  InteractionStyles &
  GridStyles &
  TransformStyles;

export type WebViewProps = {
  style?: StyleProp<ViewStyle>;

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
};

export type ViewProps = WebViewProps & Omit<NativeViewProps, 'style' | 'accessibilityRole'>;

const View = NativeView as ComponentType<ViewProps>;

export default View;
