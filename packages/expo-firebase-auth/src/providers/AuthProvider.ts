import { Auth } from './types';

export default class AuthProvider {
  static PROVIDER_ID = 'unknown';

  readonly providerId: string;
  readonly scopes: string[];

  constructor(providerId: string) {
    this.providerId = providerId;
    this.scopes = [];
  }

  addScope(scope: string): AuthProvider {
    if (this.scopes.indexOf(scope) < 0) {
      this.scopes.push(scope);
    }
    return this;
  }

  getScopes(): string[] {
    return [...this.scopes];
  }

  signIn(auth: Auth) {
    // override to implement
  }
}

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
