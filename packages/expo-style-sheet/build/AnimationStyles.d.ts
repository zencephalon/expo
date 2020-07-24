/***
 * Copyright (c) Expo team.
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/** */
export declare type AnimationDirection = 'alternate' | 'alternate-reverse' | 'normal' | 'reverse';
export declare type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';
export declare type AnimationIterationCount = number | 'infinite';
export declare type AnimationTimingFunction = string | 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'step-start' | 'step-end';
export declare type AnimationKeyframes = string | Record<string, string>;
export declare type AnimationPlayState = 'paused' | 'running';
export declare type AnimationStyles = {
    /**
     * The duration to wait before executing the transition associated with a new style value.
     * The value is defined as a `string` with the suffix "s" for seconds or "ms" milliseconds.
     *
     * @default '0ms'
     * @platform web
     */
    animationDelay?: string | string[];
    /**
     * The direction value dictates if an animation should be played forwards, backwards or in alternate cycles.
     *
     * @default 'normal'
     * @platform web
     */
    animationDirection?: AnimationDirection | AnimationDirection[];
    /**
     * The duration or durations of the animations after the animationDelay has finished. The value is defined as a string with the suffix "s" for seconds or "ms" milliseconds.
     *
     * @default '0ms'
     * @platform web
     */
    animationDuration?: string | string[];
    /**
     * Sets how a CSS animation applies styles to its target before and after its execution.
     *
     * @default 'forwards'
     * @platform web
     */
    animationFillMode?: AnimationFillMode | AnimationFillMode[];
    /**
     * The number of times an animation cycle should be played before stopping.
     *
     * If multiple values are specified, each time the animation is played the next value in the list is used,
     * cycling back to the first value after the last one is used.
     *
     * @default 1
     * @platform web
     */
    animationIterationCount?: AnimationIterationCount | AnimationIterationCount[];
    /**
     * Used to control the intermediate steps in an animation sequence by defining styles for keyframes (or waypoints) along the animation sequence.
     * This gives more control over the intermediate steps of the animation sequence than transitions.
     *
     * @platform web
     */
    animationKeyframes?: AnimationKeyframes | AnimationKeyframes[];
    /**
     * Whether an animation is running or paused.
     * Resuming a paused animation will start the animation from where it left off at the time it was paused, rather than starting over from the beginning of the animation sequence.
     *
     * @default 'running'
     * @platform web
     */
    animationPlayState?: AnimationPlayState | AnimationPlayState[];
    /**
     * How an animation progresses through the duration of each cycle.
     *
     * @default 'normal'
     * @platform web
     */
    animationTimingFunction?: AnimationTimingFunction | AnimationTimingFunction[];
};
