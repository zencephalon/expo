import { Platform } from '@unimodules/core';
import { StoreReviewPreviewOptions } from './StoreReview.types';

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
  setTintColor: null as null | ((color: string) => Promise<void>),
  presentPreviewAsync: null as
    | null
    | ((options: StoreReviewPreviewOptions) => Promise<{ type: 'dismiss' }>),
  dismissPreviewAsync: null as null | (() => Promise<void>),
};
