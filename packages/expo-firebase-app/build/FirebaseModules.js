const FirebaseAuth = '';
const FacebookAuthProvider = '';
const GoogleAuthProvider = '';
/*export { FirebaseAnalytics } from '@firebase/analytics-types';
export { FirebaseAuth, FacebookAuthProvider, GoogleAuthProvider } from '@firebase/auth-types';
export { FirebaseDatabase } from '@firebase/database-types';
export { FirebaseFirestore } from '@firebase/firestore-types';
export { FirebaseFunctions } from '@firebase/functions-types';
export { FirebaseMessaging } from '@firebase/messaging-types';
export { FirebasePerformance } from '@firebase/performance-types';
export { RemoteConfig as FirebaseRemoteConfig } from '@firebase/remote-config-types';
export { FirebaseStorage } from '@firebase/storage-types';
*/
export let analytics;
export let auth;
export let database;
export let firestore;
export let functions;
export let messaging;
export let performance;
export let remoteConfig;
export let storage;
export function getModule(name) {
    switch (name) {
        case 'analytics':
            return analytics;
        case 'auth':
            return auth;
        case 'database':
            return database;
        case 'firestore':
            return firestore;
        case 'functions':
            return functions;
        case 'messaging':
            return messaging;
        case 'performance':
            return performance;
        case 'remoteConfig':
            return remoteConfig;
        case 'storage':
            return storage;
    }
}
export function setModule(name, mod) {
    switch (name) {
        case 'analytics':
            analytics = mod;
            break;
        case 'auth':
            auth = mod;
            break;
        case 'database':
            database = mod;
            break;
        case 'firestore':
            firestore = mod;
            break;
        case 'functions':
            functions = mod;
            break;
        case 'messaging':
            messaging = mod;
            break;
        case 'performance':
            performance = mod;
            break;
        case 'remoteConfig':
            remoteConfig = mod;
            break;
        case 'storage':
            storage = mod;
            break;
    }
}
//# sourceMappingURL=FirebaseModules.js.map