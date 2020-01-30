import { Auth } from './types';
import FederatedProvider from './FederatedProvider';
export default class FacebookAuthProvider extends FederatedProvider {
    static PROVIDER_ID: string;
    constructor();
    signIn(auth: Auth): Promise<any>;
}
