/***
 * Copyright (c) Expo team.
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export declare type Cursor = 'alias' | 'all-scroll' | 'auto' | 'cell' | 'context-menu' | 'copy' | 'crosshair' | 'default' | 'grab' | 'grabbing' | 'help' | 'pointer' | 'progress' | 'wait' | 'text' | 'vertical-text' | 'move' | 'none' | 'no-drop' | 'not-allowed' | 'zoom-in' | 'zoom-out' | 'col-resize' | 'e-resize' | 'ew-resize' | 'n-resize' | 'ne-resize' | 'ns-resize' | 'nw-resize' | 'row-resize' | 's-resize' | 'se-resize' | 'sw-resize' | 'w-resize' | 'nesw-resize' | 'nwse-resize';
export declare type TouchAction = 'auto' | 'inherit' | 'manipulation' | 'none' | 'pan-down' | 'pan-left' | 'pan-right' | 'pan-up' | 'pan-x' | 'pan-y' | 'pinch-zoom';
export declare type UserSelect = 'all' | 'auto' | 'contain' | 'none' | 'text';
export declare type InteractionStyles = {
    /**
     * https://developer.mozilla.org/en-US/docs/Web/CSS/cursor#Formal_syntax
     * @platform web
     */
    cursor?: Cursor;
    /**
     * https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action#Formal_syntax
     * @platform web
     */
    touchAction?: TouchAction;
    /**
     * https://developer.mozilla.org/en-US/docs/Web/CSS/user-select#Formal_syntax_2
     *
     * @platform web
     */
    userSelect?: UserSelect;
    /**
     * https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
     *
     * @platform web
     */
    willChange?: string;
};
