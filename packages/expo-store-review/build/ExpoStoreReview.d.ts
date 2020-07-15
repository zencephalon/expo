import { StoreReviewPreviewOptions } from './StoreReview.types';
declare const _default: {
    readonly name: string;
    isAvailableAsync(): Promise<boolean>;
    requestReviewAsync: (() => Promise<void>) | null;
    setTintColor: ((color: string) => Promise<void>) | null;
    presentPreviewAsync: ((options: StoreReviewPreviewOptions) => Promise<{
        type: 'dismiss';
    }>) | null;
    dismissPreviewAsync: (() => Promise<void>) | null;
};
export default _default;
