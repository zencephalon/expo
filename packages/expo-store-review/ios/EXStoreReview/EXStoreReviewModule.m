// Copyright 2018-present 650 Industries. All rights reserved.

#import <EXStoreReview/EXStoreReviewModule.h>
#import <StoreKit/SKStoreReviewController.h>
#import <StoreKit/SKStoreProductViewController.h>

@interface EXStoreReviewModule () <SKStoreProductViewControllerDelegate>

@property (nonatomic, copy) UMPromiseResolveBlock redirectResolve;
@property (nonatomic, copy) UMPromiseRejectBlock redirectReject;
@property (nonatomic, weak) UMModuleRegistry *moduleRegistry;

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wpartial-availability"
@property (nonatomic, strong) UIViewController *controller;
#pragma clang diagnostic pop

@end

@implementation EXStoreReviewModule

UM_EXPORT_MODULE(ExpoStoreReview);

UM_EXPORT_METHOD_AS(isAvailableAsync,
                    isAvailableAsync:(UMPromiseResolveBlock)resolve
                            rejecter:(UMPromiseRejectBlock)reject)
{
  BOOL isAvailable = NSClassFromString(@"SKStoreReviewController") != nil;
  resolve(@(isAvailable));
}

UM_EXPORT_METHOD_AS(requestReviewAsync,
                    requestReviewAsync:(UMPromiseResolveBlock)resolve
                    rejecter:(UMPromiseRejectBlock)reject)
{
  if (@available(iOS 10.3, *)) {
    dispatch_async(dispatch_get_main_queue(), ^{
      [SKStoreReviewController requestReview];
      resolve(nil);
    });
  } else {
    reject(@"E_STORE_REVIEW_UNSUPPORTED", @"Store review is not supported.", nil);
  }
}

UM_EXPORT_METHOD_AS(presentPreviewAsync,
                    presentPreviewAsync:(NSDictionary *)options
                    resolver:(UMPromiseResolveBlock)resolve
                    rejecter:(UMPromiseRejectBlock)reject)
{
  // Ensure the API is available and no other preview is currently pending.
  if (![self isPreviewAvailable:reject] || ![self initializeControllerWithResolver:resolve andRejecter:reject]) {
    return;
  }
  dispatch_async(dispatch_get_main_queue(), ^{
    SKStoreProductViewController *controller = [[SKStoreProductViewController alloc] init];
    controller.delegate = self;
    self.controller = controller;
    
    __weak typeof(self) weakSelf = self;

    [controller loadProductWithParameters:[EXStoreReviewModule propertiesFromOptions:options] completionBlock:^(BOOL result, NSError * _Nullable error) {
          if (result) return;
          // Something went wrong and the controller was dismissed.
      
          __strong typeof(self) strongSelf = weakSelf;
          // This can be invoked after the controller is dismissed when it was loaded with invalid options, or when the controller was dismissed before the content could be loaded over the network.
          if (strongSelf.redirectReject) {
            if (error) {
              strongSelf.redirectReject(@"E_STORE_REVIEW_PREVIEW_LOADING", [@"Failed to load iTunes preview: " stringByAppendingString:error.localizedDescription], nil);
            } else {
              strongSelf.redirectReject(@"E_STORE_REVIEW_PREVIEW_LOADING", @"An unknown error occurred while attempting to load iTunes preview.", nil);
            }
          }
          [strongSelf flowDidFinish];
          return;
    }];
    // success loading the app
    // present the controller
    UIViewController *currentViewController = [UIApplication sharedApplication].keyWindow.rootViewController;
    while (currentViewController.presentedViewController) {
      currentViewController = currentViewController.presentedViewController;
    }
    [currentViewController presentViewController:controller animated:true completion:nil];
  });
}

UM_EXPORT_METHOD_AS(dismissPreviewAsync,
                    dismissPreviewAsyncWithResolver:(UMPromiseResolveBlock)resolve
                    rejecter:(UMPromiseRejectBlock)reject)
{
  // These checks aren't required but they can help provide helpful error messages.
  if (![self isPreviewAvailable:reject]) {
    return;
  }

  // TODO(Bacon): Is it necessary to ensure a preview is in progress or will that just cause race conditions?
  // This is the same logic used in expo-web-browser to dismiss the browser.
  // It abstractly dismisses the top most presented view controller, regardless of type.
  dispatch_async(dispatch_get_main_queue(), ^{
    __weak typeof(self) weakSelf = self;
    UIViewController *currentViewController = [UIApplication sharedApplication].keyWindow.rootViewController;
    while (currentViewController.presentedViewController) {
      currentViewController = currentViewController.presentedViewController;
    }
    
    [currentViewController dismissViewControllerAnimated:YES completion:^{
      __strong typeof(self) strongSelf = weakSelf;
       if (strongSelf) {
         if (strongSelf.redirectResolve) {
           strongSelf.redirectResolve(@{
             @"type": @"dismiss",
           });
         }
         [strongSelf flowDidFinish];
       }
      resolve(nil);
    }];
  });
}

- (BOOL)isPreviewAvailable:(UMPromiseRejectBlock)reject {
  if (NSClassFromString(@"SKStoreProductViewController") == nil) {
    reject(@"E_STORE_REVIEW_PREVIEW_UNSUPPORTED", @"iTunes preview is not supported.", nil);
    return NO;
  }
  #if TARGET_IPHONE_SIMULATOR
  reject(@"E_STORE_REVIEW_PREVIEW_UNSUPPORTED", @"iTunes preview is not supported in the simulator.", nil);
  return NO;
  #endif
  return YES;
}

- (BOOL)initializeControllerWithResolver:(UMPromiseResolveBlock)resolve andRejecter:(UMPromiseRejectBlock)reject {
  if (_redirectResolve) {
    reject(@"E_STORE_REVIEW_PREVIEW_PENDING", @"Another iTunes preview is already being presented.", nil);
    return NO;
  }
  _redirectReject = reject;
  _redirectResolve = resolve;

  return YES;
}

/**
 * Called when the controller finishes, there is no way to detect if it was successful or not.
 */
-(void)productViewControllerDidFinish:(nonnull SKStoreProductViewController *)controller
{
  [controller dismissViewControllerAnimated:true completion:^{
    if (self.redirectResolve) {
      self.redirectResolve(@{ @"type": @"cancel" });
    }
    [self flowDidFinish];
  }];
}

-(void)flowDidFinish
{
  _redirectResolve = nil;
  _redirectReject = nil;
  _controller = nil;
}

- (void)setModuleRegistry:(UMModuleRegistry *)moduleRegistry
{
  _moduleRegistry = moduleRegistry;
}

+ (NSDictionary *)propertiesFromOptions:(NSDictionary *)input
{
    NSMutableDictionary *properties = [[NSMutableDictionary alloc] init];
 
    if (input[@"itemId"]) {
      // @"id"
      properties[SKStoreProductParameterITunesItemIdentifier] = input[@"itemId"];
    }
    if (@available(iOS 11.0, *)) {
      if (input[@"productId"]) {
        // @"offerName"
        properties[SKStoreProductParameterProductIdentifier] = input[@"productId"];
      }
    }
    if (input[@"affiliateToken"]) {
      // @"at"
      properties[SKStoreProductParameterAffiliateToken] = input[@"affiliateToken"];
    }
    if (input[@"campaignToken"]) {
      // @"ct"
      properties[SKStoreProductParameterCampaignToken] = input[@"campaignToken"];
    }
    if (input[@"providerToken"]) {
      // @"pt"
      properties[SKStoreProductParameterProviderToken] = input[@"providerToken"];
    }
    if (input[@"advertisingPartnerToken"]) {
      // @"advt"
      properties[SKStoreProductParameterAdvertisingPartnerToken] = input[@"advertisingPartnerToken"];
    }
  
    return properties;
}

@end
