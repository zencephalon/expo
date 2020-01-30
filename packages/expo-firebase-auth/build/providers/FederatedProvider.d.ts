import AuthProvider from './AuthProvider';
export default class FederatedProvider extends AuthProvider {
    private defaultLanguageCode?;
    setCustomParameters(customOAuthParameters: object): this;
    getCustomParameters(): void;
    setDefaultLanguage(languageCode?: string): void;
}
