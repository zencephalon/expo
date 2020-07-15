import { Platform } from '@unimodules/core';
import { StoreReviewPreviewOptions, StoreReviewPreviewResultType } from './StoreReview.types';

export default {
  get name(): string {
    return 'ExpoStoreReview';
  },
  async isAvailableAsync(): Promise<boolean> {
    // true on Android, false on web
    return Platform.OS === 'android';
  },
  // Unimplemented on web and Android
  requestReviewAsync: null as null | (() => Promise<void>),
  presentPreviewAsync: null as
    | null
    | ((options: StoreReviewPreviewOptions) => Promise<{ type: StoreReviewPreviewResultType }>),
  dismissPreviewAsync: null as null | (() => Promise<void>),
};
