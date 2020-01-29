import { FirebaseModuleName, FirebaseModule } from './FirebaseApp.types';

const FirebaseAuth: any = '';
const FacebookAuthProvider: any = '';
const GoogleAuthProvider: any = '';

export type Analytics = any;
export type Auth = any;
export type Database = any;
export type Firestore = any;
export type Functions = any;
export type Messaging = any;
export type Performance = any;
export type RemoteConfig = any;
export type Storage = any;

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

export let analytics: (app?: any) => Analytics;
export let auth: {
  (app?: any): Auth;
  Auth: typeof FirebaseAuth;
  FacebookAuthProvider: typeof FacebookAuthProvider;
  GoogleAuthProvider: typeof GoogleAuthProvider;
};
export let database: (app?: any) => Database;
export let firestore: (app?: any) => Firestore;
export let functions: (app?: any) => Functions;
export let messaging: (app?: any) => Messaging;
export let performance: (app?: any) => Performance;
export let remoteConfig: (app?: any) => RemoteConfig;
export let storage: (app?: any) => Storage;

export function getModule(name: FirebaseModuleName): FirebaseModule | void {
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

export function setModule(name: FirebaseModuleName, mod: FirebaseModule) {
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
