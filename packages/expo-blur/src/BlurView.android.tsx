import { NativeModulesProxy, requireNativeViewManager } from '@unimodules/core';
import PropTypes from 'prop-types';
import * as React from 'react';
import { findNodeHandle, ViewPropTypes } from 'react-native';

import getBackgroundColor from './getBackgroundColor';

import { BlurTint, ComponentOrHandle, Props } from './BlurView.types';

export default class BlurView extends React.Component<Props> {
  static propTypes = {
    ...ViewPropTypes,
    tint: PropTypes.oneOf(['light', 'default', 'dark'] as BlurTint[]).isRequired,
    intensity: PropTypes.number.isRequired,
  };

  static defaultProps = {
    tint: 'default' as BlurTint,
    intensity: 50,
  };

  _root: ComponentOrHandle = null;

  _setNativeRef = (ref: ComponentOrHandle) => {
    this._root = ref;
  };

  setNativeProps = ({ overlayColor, tint, intensity, ...nativeProps }) => {
    if (this._root) {
      NativeModulesProxy.ExpoBlurViewManager.updateProps({
        overlayColor: this.overlayColor,
        intensity,
        ...nativeProps
      }, findNodeHandle(this._root));
    }
  };

  get overlayColor() {
    return this.props.overlayColor != null ? this.props.overlayColor : getBackgroundColor(this.props.intensity, this.props.tint)
  }

  render() {
    const { style, overlayColor, intensity, tint, ...props } = this.props;

    return (
      <NativeBlurView
        {...props}
        intensity={intensity}
        overlayColor={this.overlayColor}
        ref={this._setNativeRef}
        style={[style, { backgroundColor: 'transparent' }]}
      />
    );
  }
}

const NativeBlurView = requireNativeViewManager('ExpoBlurView');
