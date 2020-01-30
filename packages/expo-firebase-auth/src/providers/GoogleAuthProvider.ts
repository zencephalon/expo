import { Auth } from './types';
import FederatedProvider from './FederatedProvider';

export default class GoogleAuthProvider extends FederatedProvider {
  static PROVIDER_ID = 'google.com';

  constructor() {
    super(GoogleAuthProvider.PROVIDER_ID);
  }

  signIn(auth: Auth) {
    // override to implement
  }
}
