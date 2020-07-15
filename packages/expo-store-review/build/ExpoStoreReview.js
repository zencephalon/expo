import { Platform } from '@unimodules/core';
export default {
    get name() {
        return 'ExpoStoreReview';
    },
    async isAvailableAsync() {
        // true on Android, false on web
        return Platform.OS === 'android';
    },
    // Unimplemented on web and Android
    requestReviewAsync: null,
    setTintColor: null,
    presentPreviewAsync: null,
    dismissPreviewAsync: null,
};
//# sourceMappingURL=ExpoStoreReview.js.map