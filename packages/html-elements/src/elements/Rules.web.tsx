import { ComponentType, forwardRef } from 'react';
import createElement from 'react-native-web/dist/exports/createElement';

import { ViewProps } from 'expo-view';

export const HR = forwardRef((props: ViewProps, ref) => {
  return createElement('hr', { ...props, ref });
}) as ComponentType<ViewProps>;
