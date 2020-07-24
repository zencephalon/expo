/***
 * Copyright (c) Expo team.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ViewStyle } from 'expo-style-sheet/build/ViewStyles';
import { ComponentType } from 'react';
import { View as NativeView } from 'react-native';

import { ViewProps } from './ViewProps';

const View = NativeView as ComponentType<ViewProps>;

export { View, ViewStyle, ViewProps };
