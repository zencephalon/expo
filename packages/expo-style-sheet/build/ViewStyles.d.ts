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
declare type NumberOrString = string | number;
export declare type OverscrollBehaviorValue = 'auto' | 'contain' | 'none';
declare type ModifiedNativeViewStyles = Omit<NativeViewStyle, 'transform' | 'position'> & {
    position?: 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky';
};
export declare type WebViewStyles = {
    /** @platform web */
    backdropFilter?: string;
    /** @platform web */
    backgroundAttachment?: string;
    /** @platform web */
    backgroundBlendMode?: string;
    /** @platform web */
    backgroundClip?: string;
    /** @platform web */
    backgroundColor?: string;
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
    outlineOffset?: NumberOrString;
    /** @platform web */
    outlineStyle?: string;
    /** @platform web */
    outlineWidth?: NumberOrString;
    /** @platform web */
    overflowX?: string;
    /** @platform web */
    overflowY?: string;
    /** @platform web */
    overscrollBehavior?: OverscrollBehaviorValue;
    /** @platform web */
    overscrollBehaviorX?: OverscrollBehaviorValue;
    /** @platform web */
    overscrollBehaviorY?: OverscrollBehaviorValue;
    /** @platform web */
    scrollbarWidth?: 'auto' | 'none' | 'thin';
    /** @platform web */
    scrollSnapAlign?: string;
    /** @platform web */
    scrollSnapType?: string;
    /** @platform web */
    visibility?: string;
    /** @platform web */
    WebkitMaskImage?: string;
    /** @platform web */
    WebkitOverflowScrolling?: 'auto' | 'touch';
};
export declare type ViewStyle = ModifiedNativeViewStyles & WebViewStyles & AnimationStyles & TransitionStyles & InteractionStyles & GridStyles & TransformStyles;
export {};
