export default class AuthProvider {
    constructor(providerId) {
        this.providerId = providerId;
        this.scopes = [];
    }
    addScope(scope) {
        if (this.scopes.indexOf(scope) < 0) {
            this.scopes.push(scope);
        }
        return this;
    }
    getScopes() {
        return [...this.scopes];
    }
    signIn(auth) {
        // override to implement
    }
}
AuthProvider.PROVIDER_ID = 'unknown';
/*fireauth.idp.ProviderId = {
  ANONYMOUS: 'anonymous',
  CUSTOM: 'custom',
  FACEBOOK: 'facebook.com',
  FIREBASE: 'firebase',
  GITHUB: 'github.com',
  GOOGLE: 'google.com',
  PASSWORD: 'password',
  PHONE: 'phone',
  TWITTER: 'twitter.com',
};*/
//# sourceMappingURL=AuthProvider.js.map