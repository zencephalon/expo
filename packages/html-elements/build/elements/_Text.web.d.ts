import { TextProps } from 'expo-text';
import { ComponentType } from 'react';
export declare const P: ComponentType<TextProps>;
export declare const B: ComponentType<TextProps>;
export declare const S: ComponentType<TextProps>;
export declare const Del: ComponentType<TextProps>;
export declare const Strong: ComponentType<TextProps>;
export declare const I: ComponentType<TextProps>;
export declare const Q: ComponentType<import("react").PropsWithChildren<{
    href?: string | undefined;
} & Pick<import("expo-view").ViewProps, "hitSlop" | "onLayout" | "pointerEvents" | "removeClippedSubviews" | "testID" | "nativeID" | "collapsable" | "needsOffscreenAlphaCompositing" | "renderToHardwareTextureAndroid" | "shouldRasterizeIOS" | "isTVSelectable" | "hasTVPreferredFocus" | "tvParallaxProperties" | "tvParallaxShiftDistanceX" | "tvParallaxShiftDistanceY" | "tvParallaxTiltAngle" | "tvParallaxMagnification" | "onStartShouldSetResponder" | "onMoveShouldSetResponder" | "onResponderEnd" | "onResponderGrant" | "onResponderReject" | "onResponderMove" | "onResponderRelease" | "onResponderStart" | "onResponderTerminationRequest" | "onResponderTerminate" | "onStartShouldSetResponderCapture" | "onMoveShouldSetResponderCapture" | "onTouchStart" | "onTouchMove" | "onTouchEnd" | "onTouchCancel" | "onTouchEndCapture" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "key" | "selectable" | "ref" | "onClick" | "onClickCapture" | "onContextMenu" | "onKeyDown" | "onKeyUp" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "onMouseOver" | "onMouseOut" | "onMouseUp" | "onScroll" | "onTouchCancelCapture" | "onTouchMoveCapture" | "onTouchStartCapture" | "onWheel" | "tabIndex" | "rel" | "target" | "dataSet"> & import("react-native").TextPropsIOS & Pick<import("react-native").TextPropsAndroid, "selectionColor" | "textBreakStrategy"> & {
    style?: import("react-native").StyleProp<import("expo-text").TextStyle>;
    selectable?: boolean | undefined;
} & Pick<import("react-native").TextProps, "allowFontScaling" | "ellipsizeMode" | "lineBreakMode" | "numberOfLines" | "onPress" | "onLongPress" | "maxFontSizeMultiplier"> & {
    cite?: string | undefined;
}>>;
export declare const BlockQuote: ComponentType<import("react").PropsWithChildren<{
    onClick?: ((e: import("react-native").NativeSyntheticEvent<any>) => void) | undefined;
    onClickCapture?: ((e: import("react-native").NativeSyntheticEvent<any>) => void) | undefined;
    onContextMenu?: ((e: import("react-native").NativeSyntheticEvent<any>) => void) | undefined;
    onKeyDown?: ((e: import("react-native").NativeSyntheticEvent<any>) => void) | undefined;
    onKeyUp?: ((e: import("react-native").NativeSyntheticEvent<any>) => void) | undefined;
    onMouseDown?: ((e: import("react-native").NativeSyntheticEvent<any>) => void) | undefined;
    onMouseEnter?: ((e: import("react-native").NativeSyntheticEvent<any>) => void) | undefined;
    onMouseLeave?: ((e: import("react-native").NativeSyntheticEvent<any>) => void) | undefined;
    onMouseMove?: ((e: import("react-native").NativeSyntheticEvent<any>) => void) | undefined;
    onMouseOver?: ((e: import("react-native").NativeSyntheticEvent<any>) => void) | undefined;
    onMouseOut?: ((e: import("react-native").NativeSyntheticEvent<any>) => void) | undefined;
    onMouseUp?: ((e: import("react-native").NativeSyntheticEvent<any>) => void) | undefined;
    onScroll?: ((e: import("react-native").NativeSyntheticEvent<any>) => void) | undefined;
    onTouchCancelCapture?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onTouchMoveCapture?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onTouchStartCapture?: ((e: import("react-native").GestureResponderEvent) => void) | undefined;
    onWheel?: ((e: import("react-native").NativeSyntheticEvent<any>) => void) | undefined;
} & {
    tabIndex?: number | undefined;
    rel?: string | undefined;
    target?: string | undefined;
    dataSet?: Record<string, any> | undefined;
} & Pick<import("react-native").ViewProps & import("react").ClassAttributes<typeof import("react-native").View>, "hitSlop" | "onLayout" | "pointerEvents" | "removeClippedSubviews" | "testID" | "nativeID" | "collapsable" | "needsOffscreenAlphaCompositing" | "renderToHardwareTextureAndroid" | "shouldRasterizeIOS" | "isTVSelectable" | "hasTVPreferredFocus" | "tvParallaxProperties" | "tvParallaxShiftDistanceX" | "tvParallaxShiftDistanceY" | "tvParallaxTiltAngle" | "tvParallaxMagnification" | "onStartShouldSetResponder" | "onMoveShouldSetResponder" | "onResponderEnd" | "onResponderGrant" | "onResponderReject" | "onResponderMove" | "onResponderRelease" | "onResponderStart" | "onResponderTerminationRequest" | "onResponderTerminate" | "onStartShouldSetResponderCapture" | "onMoveShouldSetResponderCapture" | "onTouchStart" | "onTouchMove" | "onTouchEnd" | "onTouchCancel" | "onTouchEndCapture" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "key" | "ref"> & {
    style?: import("react-native").StyleProp<import("expo-view").ViewStyle>;
    accessibilityRole?: "article" | "button" | "header" | "link" | "main" | "menu" | "menuitem" | "summary" | "image" | "switch" | "text" | "none" | "search" | "keyboardkey" | "adjustable" | "imagebutton" | "alert" | "checkbox" | "combobox" | "menubar" | "progressbar" | "radio" | "radiogroup" | "scrollbar" | "spinbutton" | "tab" | "tablist" | "timer" | "toolbar" | "list" | "listitem" | "complementary" | "contentinfo" | "region" | "navigation" | "banner" | undefined;
    selectable?: boolean | undefined;
} & {
    cite?: string | undefined;
}>>;
export declare const EM: ComponentType<TextProps>;
export declare const BR: ComponentType<TextProps>;
export declare const Small: ComponentType<TextProps>;
export declare const Mark: ComponentType<TextProps>;
export declare const Code: ComponentType<TextProps>;
export declare const Time: ComponentType<import("react").PropsWithChildren<{
    href?: string | undefined;
} & Pick<import("expo-view").ViewProps, "hitSlop" | "onLayout" | "pointerEvents" | "removeClippedSubviews" | "testID" | "nativeID" | "collapsable" | "needsOffscreenAlphaCompositing" | "renderToHardwareTextureAndroid" | "shouldRasterizeIOS" | "isTVSelectable" | "hasTVPreferredFocus" | "tvParallaxProperties" | "tvParallaxShiftDistanceX" | "tvParallaxShiftDistanceY" | "tvParallaxTiltAngle" | "tvParallaxMagnification" | "onStartShouldSetResponder" | "onMoveShouldSetResponder" | "onResponderEnd" | "onResponderGrant" | "onResponderReject" | "onResponderMove" | "onResponderRelease" | "onResponderStart" | "onResponderTerminationRequest" | "onResponderTerminate" | "onStartShouldSetResponderCapture" | "onMoveShouldSetResponderCapture" | "onTouchStart" | "onTouchMove" | "onTouchEnd" | "onTouchCancel" | "onTouchEndCapture" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "key" | "selectable" | "ref" | "onClick" | "onClickCapture" | "onContextMenu" | "onKeyDown" | "onKeyUp" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "onMouseOver" | "onMouseOut" | "onMouseUp" | "onScroll" | "onTouchCancelCapture" | "onTouchMoveCapture" | "onTouchStartCapture" | "onWheel" | "tabIndex" | "rel" | "target" | "dataSet"> & import("react-native").TextPropsIOS & Pick<import("react-native").TextPropsAndroid, "selectionColor" | "textBreakStrategy"> & {
    style?: import("react-native").StyleProp<import("expo-text").TextStyle>;
    selectable?: boolean | undefined;
} & Pick<import("react-native").TextProps, "allowFontScaling" | "ellipsizeMode" | "lineBreakMode" | "numberOfLines" | "onPress" | "onLongPress" | "maxFontSizeMultiplier"> & {
    dateTime?: string | undefined;
}>>;
export declare const Pre: ComponentType<TextProps>;
