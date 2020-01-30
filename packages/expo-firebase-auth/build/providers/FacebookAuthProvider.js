import { CodedError } from '@unimodules/core';
import firebase from '@react-native-firebase/app';
import * as Facebook from 'expo-facebook';
import FederatedProvider from './FederatedProvider';
export default class FacebookAuthProvider extends FederatedProvider {
    constructor() {
        super(FacebookAuthProvider.PROVIDER_ID);
    }
    async signIn(auth) {
        // TODO map scopes & custom parameters to permissions
        const readPermissions = ['public_profile'];
        const { type, token, } = await Facebook.logInWithReadPermissionsAsync({
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
FacebookAuthProvider.PROVIDER_ID = 'facebook.com';
//# sourceMappingURL=FacebookAuthProvider.js.map