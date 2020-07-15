/**
 * Options for presenting an iOS App Store preview in-app.
 * This can only be used on a physical iOS device.
 */
export declare type StoreReviewPreviewOptions = {
    /**
     * iTunes Store item identifier of the product.
     */
    itemId: number;
    /**
     * iTunes Store affiliate token.
     */
    affiliateToken?: string;
    /**
     * iTunes Store affiliate campaign token.
     */
    campaignToken?: string;
    /**
     * Analytics provider token.
     */
    providerToken?: string;
    /**
     * Advertising partner token.
     */
    advertisingPartnerToken?: string;
    /**
     * SKU for the In-App Purchase product to render at the top of the product page.
     * iOS 11+ only.
     */
    productId?: string;
};
