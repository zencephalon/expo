---
title: StoreReview
sourceCodeUrl: 'https://github.com/expo/expo/tree/sdk-36/packages/expo-store-review'
---

import InstallSection from '~/components/plugins/InstallSection';
import PlatformsSection from '~/components/plugins/PlatformsSection';
import TableOfContentSection from '~/components/plugins/TableOfContentSection';

**`expo-store-review`** provides access to the `SKStoreReviewController` API in iOS 10.3+ devices, allowing you to ask the user to rate your app without ever having to leave the app itself.

> If this is used in Android the device will attempt to link to the Play Store using native `Linking` and the `android.playStoreUrl` from `app.config.js` or `app.json` instead.

<PlatformsSection android emulator ios simulator />

![](/static/images/store-review.png)

## Installation

<InstallSection packageName="expo-store-review" />

## API

```js
import * as StoreReview from 'expo-store-review';
```

<TableOfContentSection title='Error Codes' contents={['ERR_STORE_REVIEW_UNSUPPORTED', 'ERR_STORE_REVIEW_PREVIEW_UNSUPPORTED', 'ERR_STORE_REVIEW_PREVIEW_LOADING', 'ERR_STORE_REVIEW_PREVIEW_PENDING', 'ERR_STORE_REVIEW_PREVIEW_INVALID_OPTIONS']} />

### `StoreReview.requestReview()`

In the ideal circumstance this will open a native modal and allow the user to select a star rating that will then be applied to the App Store without leaving the app.
If the users device is running a version of iOS lower than 10.3, or the user is on an Android device, this will attempt to get the store URL and link the user to it.

#### Error Codes

- [`ERR_STORE_REVIEW_UNSUPPORTED`](#err_store_review_unsupported)

#### Example

```js
StoreReview.requestReview();
```

### `StoreReview.isAvailableAsync()`

Determines if the platform has the capabilities to use `StoreReview.requestReview()`. On iOS, this will return `true` if the device is running iOS 10.3+. On Android, this will return `true`. On Web, this will return `false`.

#### Example

```js
StoreReview.isAvailableAsync();
```

### `StoreReview.storeUrl()`

This uses the `Constants` API to get the `Constants.manifest.ios.appStoreUrl` on iOS, or the `Constants.manifest.android.playStoreUrl` on Android.

In the bare workflow, this will return `null`.

#### Example

```js
const url = StoreReview.storeUrl();
```

### `StoreReview.hasAction()`

This returns a promise that resolves to a boolean that let's you know if the module can perform any action. This is used for cases where the `app.json` doesn't have the proper fields, and `StoreReview.isAvailableAsync()` returns false.

#### Example

```js
if (await StoreReview.hasAction()) {
}
```

### `StoreReview.presentPreviewAsync()`

Open an in-app iOS App Store preview of a published app. If the `itemId` is not a valid iTunes App ID, a screen saying "Cannot Connect to iTunes Store" may be presented.

This is **not supported** in the iOS simulator.

#### Arguments

- **options (_StoreReviewPreviewOptions_)** -- Options used to select the app (and optional in-app purchase) to show. `itemId` property is required and must be a `number`.

#### Returns

- **result (_{ type: StoreReviewPreviewResultType }_)** -- Returns when the controller is closed. There is no way natively to detect if the user made any selection.

#### Error Codes

- [`ERR_STORE_REVIEW_PREVIEW_UNSUPPORTED`](#err_store_review_preview_unsupported)
- [`ERR_STORE_REVIEW_PREVIEW_LOADING`](#err_store_review_preview_loading)
- [`ERR_STORE_REVIEW_PREVIEW_INVALID_OPTIONS`](#err_store_review_preview_invalid_options)

### `StoreReview.dismissPreviewAsync()`

Dismiss the currently open iOS App Store preview controller.

#### Error Codes

- [`ERR_STORE_REVIEW_PREVIEW_UNSUPPORTED`](#err_store_review_preview_unsupported)

## Types

### StoreReviewPreviewOptions

Options for presenting an iOS App Store preview in-app. This can only be used on a physical iOS device.

| Name                    | Type     | Description                                                                                 |
| ----------------------- | -------- | ------------------------------------------------------------------------------------------- |
| itemId                  | `number` | iTunes Store item identifier of the product.                                                |
| affiliateToken          | `string` | iTunes Store affiliate token.                                                               |
| campaignToken           | `string` | iTunes Store affiliate campaign token.                                                      |
| providerToken           | `string` | Analytics provider token.                                                                   |
| advertisingPartnerToken | `string` | Advertising partner token.                                                                  |
| productId               | `string` | SKU for the In-App Purchase product to render at the top of the product page. iOS 11+ only. |

### StoreReviewPreviewResultType

The `type` returned from `StoreReview.presentPreviewAsync(...)`.

- **`cancel`**: The iTunes preview was closed by the user.
- **`dismiss`**: The iTunes preview is programmatically closed using `StoreReview.dismissPreviewAsync()`.
- **`locked`**: A pending preview was already in progress when `StoreReview.presentPreviewAsync()` was invoked extraneously. This can occur when a user spams an interaction that presents the preview before the preview has time to cover the button.

## Error Codes

### `ERR_STORE_REVIEW_UNSUPPORTED`

Requesting an App Store review is not supported on this device. The device must be iOS 10.3 or greater. Android and web are not supported. Be sure to check for support with `isAvailableAsync()` to avoid this error.

### `ERR_STORE_REVIEW_PREVIEW_UNSUPPORTED`

iTunes previews are not supported on the device. iTunes previews are not supported in the iOS simulator.

### `ERR_STORE_REVIEW_PREVIEW_LOADING`

Failed to load the iTunes preview. This happens after the controller is dismissed when it was loaded with invalid options, or when the controller was dismissed before the content could be loaded over the network.

If there is an undocumented or unexpected error it will use this error code too.

### `ERR_STORE_REVIEW_PREVIEW_PENDING`

Thrown when an iTunes preview is already being presented. In theory this shouldn't be thrown because `{ type: 'locked' }` exists.

### `ERR_STORE_REVIEW_PREVIEW_INVALID_OPTIONS`

Thrown when `presentPreviewAsync` is invoked without a valid numeric `itemId` option. Note that an invalid `itemId` can still be provided but iTunes won't be able to load the preview, if this happens then `ERR_STORE_REVIEW_PREVIEW_LOADING` is thrown after the controller is closed.

---

## Usage

It is important that you follow the [Human Interface Guidelines](https://developer.apple.com/ios/human-interface-guidelines/system-capabilities/ratings-and-reviews/) when using this API.

**Specifically:**

- Don't call `StoreReview.requestReview()` from a button - instead try calling it after the user has finished some signature interaction in the app.
- Don't spam the user
- Don't request a review when the user is doing something time sensitive like navigating.

### Write iOS Reviews

You can redirect someone to the "Write a Review" screen for an app in the iOS App Store by using the query parameter `action=write-review`. For example:

```ts
const itunesItemId = 982107779;
Linking.openURL(`https://apps.apple.com/app/apple-store/id${itunesItemId}?action=write-review`);
```

This can occur when the options were invalid, when the network connection is weak, or when the preview is dismissed before the content could finish loading.
