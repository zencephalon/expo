/**
 * A JS interface to a native module for testing. The native module may be exposed only in builds
 * configured for tests (ex: not production builds) in which case this JS interface mocks the native
 * module.
 */

import { NativeModules } from 'react-native';

const { ExponentTest } = NativeModules;

export function log(message: string): void {
  if (ExponentTest) {
    ExponentTest.log(message);
  }
}

export function completed(result: any): void {
  if (ExponentTest) {
    let json = JSON.stringify(result);
    ExponentTest.completed(json);
  }
}

export async function shouldSkipTestsRequiringPermissionsAsync(): Promise<boolean> {
  if (ExponentTest) {
    return await ExponentTest.shouldSkipTestsRequiringPermissionsAsync();
  }
  return false;
}
