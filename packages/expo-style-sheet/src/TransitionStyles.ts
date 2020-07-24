/***
 * Copyright (c) Expo team.
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export type TransitionProperty = 'none' | 'all' | string;

export type TransitionTimingFunction =
  | string
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'step-start'
  | 'step-end';

export type TransitionStyles = {
  /**
   * The duration or durations an animation will wait before starting or proceeding to interpolate to the next value.
   *
   * @default '0ms'
   * @platform web
   */
  transitionDelay?: string | string[];
  /**
   * Durations of the transitions after the delay has finished. Durations are strings that can be prefixed with either "s" for seconds or "ms" for milliseconds.
   *
   * @default '0ms'
   * @platform web
   */
  transitionDuration?: string | string[];
  /**
   * Define the name or names of the properties that should be controlled by the transition effect.
   * The transition will begin whenever one of the specified properties change.
   *
   * @default 'all'
   * @platform web
   */
  transitionProperty?: TransitionProperty | TransitionProperty[];
  /**
   * This value denotes the speed curve of the transition effect.
   *
   * @default 'linear'
   * @platform web
   */
  transitionTimingFunction?: TransitionTimingFunction | TransitionTimingFunction[];
};
