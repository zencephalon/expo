import { Constants } from 'expo';
import { Platform } from 'react-native';

import * as Testing from './Testing';

/**
 * Returns a `when` function that can be used for idomatic conditional Jasmine tests:
 *
 *   when({ platform: 'ios' }).it(`shows an Apple Pay prompt`, async () => { ... });
 */
export async function createWhenFilterAsync(jasmineInterface) {
  let { describe, xdescribe, it, xit } = jasmineInterface;

  // Jasmine expects test suites to be defined synchronously, so this is the time to prepare
  // asynchronously fetched data needed to define the tests
  let isAutomated = await Testing.shouldSkipTestsRequiringPermissionsAsync();
  let environment = { isAutomated };

  return function when(condition) {
    let run =
      typeof condition === 'function' ? condition() : _matchesPattern(condition, environment);
    return run ? { describe, it } : { describe: xdescribe, it: xit };
  };
}

function _matchesPattern(condition, environment) {
  if (condition.platform != null && !_matchesField(condition.platform, Platform.OS)) {
    return false;
  }

  if (condition.isDevice != null && condition.isDevice !== Constants.isDevice) {
    return false;
  }

  if (condition.isStandalone != null && Constants.appOwnership !== 'standalone') {
    return false;
  }

  if (condition.isAutomated != null && condition.isAutomated === environment.isAutomated) {
    return false;
  }

  return true;
}

function _matchesField(condition, value) {
  if (typeof condition !== 'function') {
    return condition === value;
  }
  return condition(value);
}
