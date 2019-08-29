import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { ModalTransition } from 'expo-image-picker/build/ImagePicker.types';
import Constants from 'expo-constants';
import * as TestUtils from '../TestUtils';

export const name = 'ImagePicker';

export async function test({ it, beforeAll, expect, jasmine, xdescribe, describe, afterAll }) {
  //   const shouldSkipTestsRequiringPermissions = await TestUtils.shouldSkipTestsRequiringPermissionsAsync();
  //   const describeWithPermissions = shouldSkipTestsRequiringPermissions ? xdescribe : describe;

  describe(name, () => {
    let originalTimeout;

    beforeAll(async () => {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      await Permissions.askAsync(Permissions.CAMERA);

      await TestUtils.acceptPermissionsAndRunCommandAsync(() => {
        return Permissions.askAsync(Permissions.CAMERA_ROLL);
      });
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout * 10;
    });

    it('launches image picker', async () => {
      let forceCancel;
      setTimeout(async () => {
        forceCancel = await ImagePicker.dismissAsync({
          animateOut: false,
        });
      }, 1500);
      const { cancelled } = await ImagePicker.launchImageLibraryAsync({
        animateIn: false,
        animateOut: false,
      });
      expect(cancelled).toBe(true);
      expect(forceCancel).toBe(true);
    });

    it('cannot force cancel a null controller', async () => {
      const forceCancel = await ImagePicker.dismissAsync();
      expect(forceCancel).toBe(false);
    });

    it('throws concurrency error', async () => {
      let forceCancel;
      let forceCancelError;
      setTimeout(async () => {
        setTimeout(async () => {
          try {
            await ImagePicker.dismissAsync();
          } catch (error) {
            forceCancelError = error;
          }
        }, 5);
        forceCancel = await ImagePicker.dismissAsync();
      }, 1500);
      const { cancelled } = await ImagePicker.launchImageLibraryAsync();
      expect(cancelled).toBe(true);
      expect(forceCancel).toBe(true);
      expect(forceCancelError.code).toBe('E_CONCURRENT_TASK');
    });

    if (Constants.isDevice) {
      it('launches the camera', async () => {
        let forceCancel;
        setTimeout(async () => {
          forceCancel = await ImagePicker.dismissAsync();
        }, 1500);
        const { cancelled } = await ImagePicker.launchCameraAsync();
        expect(cancelled).toBe(true);
        expect(forceCancel).toBe(true);
      });
    } else {
      it('natively prevents the camera from launching on a simulator', async () => {
        let err;
        try {
          await ImagePicker.launchCameraAsync();
        } catch ({ code }) {
          err = code;
        }
        expect(err).toBe('CAMERA_MISSING');
      });
    }
    afterAll(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
  });
}
