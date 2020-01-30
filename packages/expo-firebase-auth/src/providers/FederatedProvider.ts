import AuthProvider from './AuthProvider';

export default class FederatedProvider extends AuthProvider {
  private defaultLanguageCode?: string;

  setCustomParameters(customOAuthParameters: object) {
    //this.customParameters_ = goog.object.clone(customParameters);
    return this;
  }

  getCustomParameters() {
    // TODO
  }

  setDefaultLanguage(languageCode?: string) {
    this.defaultLanguageCode = languageCode;
  }
}
