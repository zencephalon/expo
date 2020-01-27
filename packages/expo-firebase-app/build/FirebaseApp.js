import { UnavailabilityError } from '@unimodules/core';
import ExpoFirebaseApp from './ExpoFirebaseApp';
export * from './GoogleServices';
export const { DEFAULT_OPTIONS, DEFAULT_NAME } = ExpoFirebaseApp;
class FirebaseApp {
    constructor(config) {
        this.name = config.name;
        this.options = config.options;
    }
    /**
     * Delete the Firebase app instance.
     */
    deleteAsync() {
        // @ts-ignore
        if (!ExpoFirebaseApp.deleteAppAsync) {
            throw new UnavailabilityError('expo-firebase-app', 'deleteAppAsync');
        }
        // @ts-ignore
        return ExpoFirebaseApp.deleteAppAsync(this._name);
    }
}
/**
 * Initializes a Firebase app.
 *
 * On iOS and Android this method is optional, as the default Firebase app instance
 * is automatically initialized when the `GoogleService-Info.plist` or `google-services.json`
 * file is configured.
 *
 * You can use this method to initialize additional Firebase app instances. You should typically not
 * initialize the default Firebase with custom options, as the default app is tightly coupled
 * with the google-services config that is shipped with the app.
 *
 * @param {FirebaseOption} [options] - Firebase configuration options
 * @param {string} [name] - Name of the firebase-app (when omitted the default name is used)
 * @return {Promise<FirebaseApp>} - Firebase app
 */
export async function initializeAppAsync(options, name) {
    // @ts-ignore
    if (!ExpoFirebaseApp.initializeAppAsync) {
        throw new UnavailabilityError('expo-firebase-app', 'initializeAppAsync');
    }
    const result = await ExpoFirebaseApp.initializeAppAsync(options, name);
    return new FirebaseApp(result);
}
/**
 * Retrieves a Firebase app instance.
 * When called with no arguments, the default app is returned. When an app name is provided,
 * the app corresponding to that name is returned. An exception is thrown if the app being
 * retrieved has not yet been initialized.
 *
 * @param {string} name - Optional name of the app
 * @return {Promise<FirebaseApp>} - Firebase app
 */
export async function getAppAsync(name) {
    // @ts-ignore
    if (!ExpoFirebaseApp.getAppAsync) {
        throw new UnavailabilityError('expo-firebase-app', 'getAppAsync');
    }
    const result = await ExpoFirebaseApp.getAppAsync(name);
    return new FirebaseApp(result);
}
/**
 * Retrieves all initialized Firebase app instances.
 *
 * @return {Promise<FirebaseApp[]>} - Array of firebase apps
 */
export async function getAppsAsync() {
    // @ts-ignore
    if (!ExpoFirebaseApp.getAppsAsync) {
        throw new UnavailabilityError('expo-firebase-app', 'getAppsAsync');
    }
    // @ts-ignore
    const results = await ExpoFirebaseApp.getAppsAsync();
    return results.map(result => new FirebaseApp(result));
}
/**
 * Deletes a Firebase app by its name.
 *
 * @internal
 * This function is provided for testing purposes, more specifically
 * to test forbidden access to the prohibited default app.
 */
export async function deleteAppAsync(name) {
    // @ts-ignore
    if (!ExpoFirebaseApp.deleteAppAsync) {
        throw new UnavailabilityError('expo-firebase-app', 'deleteAppAsync');
    }
    await ExpoFirebaseApp.deleteAppAsync(name);
}
//# sourceMappingURL=FirebaseApp.js.map