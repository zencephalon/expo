/***
 * Copyright (c) Expo team.
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { TransformsStyle as NativeTransformsStyle, RotateTransform, RotateXTransform, RotateYTransform, RotateZTransform, ScaleTransform, ScaleXTransform, ScaleYTransform, SkewXTransform, SkewYTransform } from 'react-native';
export { RotateTransform, RotateXTransform, RotateYTransform, RotateZTransform, ScaleTransform, ScaleXTransform, ScaleYTransform, SkewXTransform, SkewYTransform, };
export declare type PerpectiveTransform = {
    perspective: StringOrNumber;
};
/**
 * @platform web
 */
export declare type ScaleZTransform = {
    scaleZ: number;
};
/**
 * @platform web
 */
export declare type Scale3DTransform = {
    scale3d: string;
};
export declare type TranslateXTransform = {
    translateX: StringOrNumber;
};
export declare type TranslateYTransform = {
    translateY: StringOrNumber;
};
/**
 * @platform web
 */
export declare type TranslateZTransform = {
    translateZ: StringOrNumber;
};
/**
 * @platform web
 */
export declare type Translate3DTransform = {
    translate3d: string;
};
declare type StringOrNumber = string | number;
export declare type Transform = PerpectiveTransform | RotateTransform | RotateXTransform | RotateYTransform | RotateZTransform | ScaleTransform | ScaleXTransform | ScaleYTransform | SkewXTransform | SkewYTransform | ScaleZTransform | Scale3DTransform | TranslateXTransform | TranslateYTransform | TranslateZTransform | Translate3DTransform;
export declare type TransformStyles = Omit<NativeTransformsStyle, 'transform' | 'perspective'> & {
    perspective?: StringOrNumber;
    transform?: Transform[];
    /**
     * @platform web
     */
    perspectiveOrigin?: string;
    /**
     * @platform web
     */
    transformOrigin?: string;
    /**
     * @platform web
     */
    transformStyle?: 'flat' | 'preserve-3d';
};
