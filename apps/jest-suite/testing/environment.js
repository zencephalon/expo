import * as jasmine from 'jasmine-core/lib/jasmine-core/jasmine';

import { createWhenFilterAsync } from './test-filters';

export async function createTestEnvironmentAsync() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  let jasmineCore = jasmine.core(jasmine);
  let jasmineEnv = jasmineCore.getEnv({ suppressLoadErrors: true });

  // Configure the Jasmine interface that tests use and globally expose it in the same way Jest and
  // Jasmine do
  let jasmineInterface = jasmine.interface(jasmineCore, jasmineEnv);
  let when = await createWhenFilterAsync(jasmineInterface);
  jasmineInterface.when = when;

  return { jasmineCore, jasmineEnv, jasmineInterface };
}
