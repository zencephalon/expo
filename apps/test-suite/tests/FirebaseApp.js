import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as FirebaseApp from 'expo-firebase-app';

export const name = 'FirebaseApp';

const SYSTEM_APP_NAME = '[DEFAULT]';

const SANDBOX_APP_PREFIX = '__sandbox';

function getTestSuiteFirebaseOptions() {
  if (Platform.OS === 'android') {
    const googleServicesJson = require('../google-services.json');
    return FirebaseApp.getFirebaseOptionsFromAndroidGoogleServicesFile(googleServicesJson);
  } else if (Platform.OS === 'ios') {
    // TODO, load PLIST using babel-loader?
    return {
      clientId: '1082251606918-ktto2c4d3tit64uikmki48j7520qensp.apps.googleusercontent.com',
      apiKey: 'AIzaSyBH7Pa-tgLgL2QK6DgGhKipuDTbKqU6Wlk',
      storageBucket: 'expo-test-suite.appspot.com',
      projectId: 'expo-test-suite',
      appId: '1:1082251606918:ios:f448eb8df0adab41e24a07',
      databaseURL: 'https://expo-test-suite.firebaseio.com',
      messagingSenderId: '1082251606918',
    };
  } else {
    throw new Error('Platform not supported');
  }
}

function expectFirebaseOptions(expect, options1, options2) {
  expect(options1.appId).toBe(options2.appId);
  expect(options1.messagingSenderId).toBe(options2.messagingSenderId);
  expect(options1.apiKey).toBe(options2.apiKey);
  expect(options1.projectId).toBe(options2.projectId);
  expect(options1.clientId).toBe(options2.clientId);
  expect(options1.storageBucket).toBe(options2.storageBucket);
  expect(options1.databaseURL).toBe(options2.databaseURL);
}

export async function test({ describe, it, xit, expect, beforeAll }) {
  const isSandboxed = Constants.appOwnership === 'expo';
  const itWhenSandboxed = isSandboxed ? it : xit;
  const itWhenNotSandboxed = isSandboxed ? xit : it;

  describe(name, () => {
    beforeAll(async () => {
      await FirebaseApp.initializeAppAsync();
    });

    /*afterAll(async () => {
      await FirebaseApp.initializeAppAsync();
    });*/

    describe('getAppAsync()', async () => {
      it(`returns the default app`, async () => {
        let error = null;
        try {
          const app = await FirebaseApp.getAppAsync();
          expect(app.name).toBe(FirebaseApp.DEFAULT_NAME);
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
      it(`returns the default app by name its name`, async () => {
        let error = null;
        try {
          const { name } = await FirebaseApp.getAppAsync();
          const app = await FirebaseApp.getAppAsync(name);
          expect(app.name).toBe(name);
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
      it(`throws when an invalid app name is specified`, async () => {
        let error = null;
        try {
          await FirebaseApp.getAppAsync('123ThisAppNameCertainlyDoesntExist');
        } catch (e) {
          error = e;
        }
        expect(error).not.toBeNull();
      });
      itWhenNotSandboxed(`returns the default system app`, async () => {
        let error = null;
        try {
          const app = await FirebaseApp.getAppAsync();
          expect(app.name).toBe(SYSTEM_APP_NAME);
          expect(app.name.substring(0, SANDBOX_APP_PREFIX.length)).not.toBe(SANDBOX_APP_PREFIX);
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
      itWhenSandboxed(`returns a sandboxed app`, async () => {
        let error = null;
        try {
          const app = await FirebaseApp.getAppAsync();
          expect(app.name.substring(0, SANDBOX_APP_PREFIX.length)).toBe(SANDBOX_APP_PREFIX);
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
      itWhenNotSandboxed(`allows access to the default system app`, async () => {
        let error = null;
        try {
          const app = await FirebaseApp.getAppAsync(SYSTEM_APP_NAME);
          expect(app.name).toBe(SYSTEM_APP_NAME);
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
      itWhenSandboxed(`forbids access to the protected system app`, async () => {
        let error = null;
        try {
          const app = await FirebaseApp.getAppAsync(SYSTEM_APP_NAME);
          expect(app.name).toBe(SYSTEM_APP_NAME);
        } catch (e) {
          error = e;
        }
        expect(error).not.toBeNull();
      });
    });

    describe('getAppsAsync()', async () => {
      it(`returns 1 firebase app`, async () => {
        let error = null;
        try {
          const apps = await FirebaseApp.getAppsAsync();
          expect(apps.length).toBe(1);
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
      itWhenNotSandboxed(`returns a non sandboxed app`, async () => {
        let error = null;
        try {
          const apps = await FirebaseApp.getAppsAsync();
          expect(apps.length).toBe(1);
          const app = apps[0];
          expect(app.name.substring(0, SANDBOX_APP_PREFIX.length)).not.toBe(SANDBOX_APP_PREFIX);
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
      itWhenSandboxed(`returns a sandboxed app`, async () => {
        let error = null;
        try {
          const apps = await FirebaseApp.getAppsAsync();
          expect(apps.length).toBe(1);
          const app = apps[0];
          expect(app.name.substring(0, SANDBOX_APP_PREFIX.length)).toBe(SANDBOX_APP_PREFIX);
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
    });

    describe('DEFAULT_OPTIONS', async () => {
      it(`returns the default firebase options`, async () => {
        let error = null;
        try {
          const { DEFAULT_OPTIONS } = FirebaseApp;
          expect(DEFAULT_OPTIONS.appId).not.toBeNull();
          expect(DEFAULT_OPTIONS.messagingSenderId).not.toBeNull();
          expect(DEFAULT_OPTIONS.apiKey).not.toBeNull();
          expect(DEFAULT_OPTIONS.projectId).not.toBeNull();
          expect(DEFAULT_OPTIONS.clientId).not.toBeNull();
          expect(DEFAULT_OPTIONS.storageBucket).not.toBeNull();
          expect(DEFAULT_OPTIONS.databaseURL).not.toBeNull();
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
      it(`should be the same as the default firebase app`, async () => {
        let error = null;
        try {
          const { DEFAULT_OPTIONS } = FirebaseApp;
          const app = await FirebaseApp.getAppAsync();
          const { options } = app;
          expectFirebaseOptions(expect, DEFAULT_OPTIONS, options);
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
      itWhenSandboxed(`returns the firebase options from the test-suite`, async () => {
        let error = null;
        try {
          const { DEFAULT_OPTIONS } = FirebaseApp;
          expectFirebaseOptions(expect, DEFAULT_OPTIONS, getTestSuiteFirebaseOptions());
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
    });

    describe('deleteAppAsync()', async () => {
      it(`fails when an unknown name is specified`, async () => {
        let error = null;
        try {
          await FirebaseApp.deleteAppAsync('someNonExistentApp');
        } catch (e) {
          error = e;
        }
        expect(error).not.toBeNull();
      });
      itWhenSandboxed(`fails when the protected system app is specified`, async () => {
        let error = null;
        try {
          await FirebaseApp.deleteAppAsync(SYSTEM_APP_NAME);
        } catch (e) {
          error = e;
        }
        expect(error).not.toBeNull();
      });
      it(`deletes the default app when no name is provided`, async () => {
        let error = null;
        try {
          await FirebaseApp.deleteAppAsync();
          const apps = await FirebaseApp.getAppsAsync();
          expect(apps.length).toBe(0);
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
      it(`deletes the app when a valid name is provided`, async () => {
        let error = null;
        try {
          const app = await FirebaseApp.initializeAppAsync();
          await FirebaseApp.deleteAppAsync(app.name);
          const apps = await FirebaseApp.getAppsAsync();
          expect(apps.length).toBe(0);
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
      it(`deletes the app using app.deleteAsync()`, async () => {
        let error = null;
        try {
          const app = await FirebaseApp.initializeAppAsync();
          await app.deleteAsync();
          const apps = await FirebaseApp.getAppsAsync();
          expect(apps.length).toBe(0);
        } catch (e) {
          error = e;
        }
        expect(error).toBeNull();
      });
    });
  });
}
