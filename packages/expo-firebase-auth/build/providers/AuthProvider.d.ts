import { Auth } from './types';
export default class AuthProvider {
    static PROVIDER_ID: string;
    readonly providerId: string;
    readonly scopes: string[];
    constructor(providerId: string);
    addScope(scope: string): AuthProvider;
    getScopes(): string[];
    signIn(auth: Auth): void;
}
