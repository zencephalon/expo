/***
 * Copyright (c) Expo team.
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/**
 * Styles related to interacting with elements and interfaces.
 *
 * @platform web
 */
export declare type InteractionStyles = {
    /**
     * Define the type of mouse cursor (if any), to show when the mouse hovers over a component.
     *
     * @see [CSS/cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor)
     * @platform web
     */
    cursor?: 'alias' | 'all-scroll' | 'auto' | 'cell' | 'context-menu' | 'copy' | 'crosshair' | 'default' | 'grab' | 'grabbing' | 'help' | 'pointer' | 'progress' | 'wait' | 'text' | 'vertical-text' | 'move' | 'none' | 'no-drop' | 'not-allowed' | 'zoom-in' | 'zoom-out' | 'col-resize' | 'e-resize' | 'ew-resize' | 'n-resize' | 'ne-resize' | 'ns-resize' | 'nw-resize' | 'row-resize' | 's-resize' | 'se-resize' | 'sw-resize' | 'w-resize' | 'nesw-resize' | 'nwse-resize';
    /**
     * How an element's region can be manipulated by a touchable user interface.
     *
     * @see [CSS/touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action)
     * @platform web
     */
    touchAction?: 'auto' | 'inherit' | 'manipulation' | 'none' | 'pan-down' | 'pan-left' | 'pan-right' | 'pan-up' | 'pan-x' | 'pan-y' | 'pinch-zoom';
    /**
     * Whether the user can select text. This doesn't have any effect on content loaded as [chrome](https://developer.mozilla.org/en-US/docs/Glossary/Chrome), except in textboxes.
     * For `Text` use the `selectable` prop instead.
     *
     * @see [CSS/user-select](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select)
     * @platform web
     */
    userSelect?: 'all' | 'auto' | 'contain' | 'none' | 'text';
    /**
     * Hints to browsers how an element is expected to change.
     *
     * @see [CSS/will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)
     * @platform web
     */
    willChange?: string | string[];
};
