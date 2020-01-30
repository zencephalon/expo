import FederatedProvider from './FederatedProvider';
export default class GoogleAuthProvider extends FederatedProvider {
    constructor() {
        super(GoogleAuthProvider.PROVIDER_ID);
    }
    signIn(auth) {
        // override to implement
    }
}
GoogleAuthProvider.PROVIDER_ID = 'google.com';
//# sourceMappingURL=GoogleAuthProvider.js.map