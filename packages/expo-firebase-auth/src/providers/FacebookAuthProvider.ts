import { CodedError } from '@unimodules/core';
import firebase from '@react-native-firebase/app';
import * as Facebook from 'expo-facebook';
import { Auth } from './types';
import FederatedProvider from './FederatedProvider';

export default class FacebookAuthProvider extends FederatedProvider {
  static PROVIDER_ID = 'facebook.com';

  constructor() {
    super(FacebookAuthProvider.PROVIDER_ID);
  }

  async signIn(auth: Auth) {
    // TODO map scopes & custom parameters to permissions

    const readPermissions = ['public_profile'];
    const {
      type,
      token,
      /*expires,
      permissions,
      declinedPermissions,*/
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: readPermissions,
    });
    if (type !== 'success') {
      // type === 'cancel'
      throw new CodedError('auth/cancelled-popup-request', 'Cancelled');
    }

    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    const userCredential = await auth.signInWithCredential(credential);
    return userCredential;
  }
}
