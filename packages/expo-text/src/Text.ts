/***
 * Copyright (c) Expo team.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TextStyle } from 'expo-style-sheet/build/TextStyles';
import { ComponentType } from 'react';
import { Text as NativeText } from 'react-native';

import { TextProps } from './TextProps';

const Text = NativeText as ComponentType<TextProps>;

export { Text, TextStyle, TextProps };
