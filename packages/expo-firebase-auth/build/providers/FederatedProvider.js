import AuthProvider from './AuthProvider';
export default class FederatedProvider extends AuthProvider {
    setCustomParameters(customOAuthParameters) {
        //this.customParameters_ = goog.object.clone(customParameters);
        return this;
    }
    getCustomParameters() {
        // TODO
    }
    setDefaultLanguage(languageCode) {
        this.defaultLanguageCode = languageCode;
    }
}
//# sourceMappingURL=FederatedProvider.js.map