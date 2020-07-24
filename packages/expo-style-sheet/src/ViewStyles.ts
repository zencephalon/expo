/***
 * Copyright (c) Expo team.
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { ViewStyle as NativeViewStyle } from 'react-native';

import { AnimationStyles } from './AnimationStyles';
import { GridStyles } from './GridStyles';
import { InteractionStyles } from './InteractionStyles';
import { TransformStyles } from './TransformStyles';
import { TransitionStyles } from './TransitionStyles';

type NumberOrString = string | number;

export type OverscrollBehaviorValue = 'auto' | 'contain' | 'none';

type ModifiedNativeViewStyles = Omit<NativeViewStyle, 'transform' | 'position'> & {
  position?: 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky';
};

export type WebViewStyles = {
  backdropFilter?: string;
  backgroundAttachment?: string;
  backgroundBlendMode?: string;
  backgroundClip?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundOrigin?: 'border-box' | 'content-box' | 'padding-box';
  backgroundPosition?: string;
  backgroundRepeat?: string;
  backgroundSize?: string;
  boxShadow?: string;
  clip?: string;
  filter?: string;
  outlineColor?: string;
  outlineOffset?: NumberOrString;
  outlineStyle?: string;
  outlineWidth?: NumberOrString;
  overscrollBehavior?: OverscrollBehaviorValue;
  overscrollBehaviorX?: OverscrollBehaviorValue;
  overscrollBehaviorY?: OverscrollBehaviorValue;
  scrollbarWidth?: 'auto' | 'none' | 'thin';
  scrollSnapAlign?: string;
  scrollSnapType?: string;
  WebkitMaskImage?: string;
  WebkitOverflowScrolling?: 'auto' | 'touch';
};

export type ViewStyle = ModifiedNativeViewStyles &
  WebViewStyles &
  AnimationStyles &
  TransitionStyles &
  InteractionStyles &
  GridStyles &
  TransformStyles;
