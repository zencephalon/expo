import { StoreReviewPreviewOptions, StoreReviewPreviewResultType } from './StoreReview.types';
declare const _default: {
    readonly name: string;
    isAvailableAsync(): Promise<boolean>;
    requestReviewAsync: (() => Promise<void>) | null;
    presentPreviewAsync: ((options: StoreReviewPreviewOptions) => Promise<{
        type: StoreReviewPreviewResultType;
    }>) | null;
    dismissPreviewAsync: (() => Promise<void>) | null;
};
export default _default;
