/***
 * Copyright (c) Expo team.
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  TransformsStyle as NativeTransformsStyle,
  RotateTransform,
  RotateXTransform,
  RotateYTransform,
  RotateZTransform,
  ScaleTransform,
  ScaleXTransform,
  ScaleYTransform,
  SkewXTransform,
  SkewYTransform,
} from 'react-native';

export {
  RotateTransform,
  RotateXTransform,
  RotateYTransform,
  RotateZTransform,
  ScaleTransform,
  ScaleXTransform,
  ScaleYTransform,
  SkewXTransform,
  SkewYTransform,
};

export type PerpectiveTransform = { perspective: StringOrNumber };
/**
 * @platform web
 */
export type ScaleZTransform = { scaleZ: number };
/**
 * @platform web
 */
export type Scale3DTransform = { scale3d: string };
export type TranslateXTransform = { translateX: StringOrNumber };
export type TranslateYTransform = { translateY: StringOrNumber };
/**
 * @platform web
 */
export type TranslateZTransform = { translateZ: StringOrNumber };
/**
 * @platform web
 */
export type Translate3DTransform = { translate3d: string };

type StringOrNumber = string | number;

export type Transform =
  | PerpectiveTransform
  | RotateTransform
  | RotateXTransform
  | RotateYTransform
  | RotateZTransform
  | ScaleTransform
  | ScaleXTransform
  | ScaleYTransform
  | SkewXTransform
  | SkewYTransform
  | ScaleZTransform
  | Scale3DTransform
  | TranslateXTransform
  | TranslateYTransform
  | TranslateZTransform
  | Translate3DTransform;

export type TransformStyles = Omit<NativeTransformsStyle, 'transform' | 'perspective'> & {
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
