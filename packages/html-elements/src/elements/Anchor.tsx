import { Text } from 'expo-text';
import React, { ComponentType, forwardRef } from 'react';
import { Linking, Platform } from 'react-native';

import { LinkProps } from './Text.types';

export const A = forwardRef(({ href, target, ...props }: LinkProps, ref) => {
  const nativeProps = Platform.select<LinkProps>({
    web: {
      href,
      target,
    },
    default: {
      onPress: event => {
        props.onPress && props.onPress(event);
        if (Platform.OS !== 'web' && href !== undefined) {
          Linking.openURL(href);
        }
      },
    },
  });
  return <Text accessibilityRole="link" {...props} {...nativeProps} ref={ref} />;
}) as ComponentType<LinkProps>;
