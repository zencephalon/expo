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
  if (@available(iOS 10.3, *)) {
    BOOL isAvailable = [SKStoreReviewController class] ? YES : NO;
    
    resolve(@(isAvailable));
  } else {
    resolve(@(NO));
  }
}

UM_EXPORT_METHOD_AS(setTintColor,
                    setTintColor:(NSString *)tintColor
                    resolver:(UMPromiseResolveBlock)resolve
                    rejecter:(UMPromiseRejectBlock)reject)
{
    UIColor *tint = [EXStoreReviewModule convertHexColorString:tintColor];
    [[UIView appearance] setTintColor:tint];
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
  if (![self isPreviewAvailable:reject]) {
    return;
  }
  if (![self initializeControllerWithResolver:resolve andRejecter:reject]) {
    return;
  }
    dispatch_async(dispatch_get_main_queue(), ^{
      SKStoreProductViewController *controller = [[SKStoreProductViewController alloc] init];
      controller.delegate = self;
      self->_controller = controller;
      [controller loadProductWithParameters:[EXStoreReviewModule propertiesFromOptions:options] completionBlock:^(BOOL result, NSError * _Nullable error) {
            if (!result) {
              [self flowDidFinish];
              reject(@"E_STORE_REVIEW_PREVIEW_UPDATE", @"Failed to load product preview because the options were invalid.", nil);
              return;
            } else if (error != nil) {
              [self flowDidFinish];
              reject(@"E_STORE_REVIEW_PREVIEW_UPDATE", error.localizedDescription, nil);
              return;
            }
            
            // success loading the app
            // present the controller
            UIViewController *currentViewController = [UIApplication sharedApplication].keyWindow.rootViewController;
            while (currentViewController.presentedViewController) {
              currentViewController = currentViewController.presentedViewController;
            }
            [currentViewController presentViewController:controller animated:true completion:nil];
        }];
    });
}

UM_EXPORT_METHOD_AS(dismissPreviewAsync,
                    dismissPreviewAsyncWithResolver:(UMPromiseResolveBlock)resolve
                    rejecter:(UMPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_main_queue(), ^{

    __weak typeof(self) weakSelf = self;
    UIViewController *currentViewController = [UIApplication sharedApplication].keyWindow.rootViewController;
    while (currentViewController.presentedViewController) {
      currentViewController = currentViewController.presentedViewController;
    }
    [currentViewController dismissViewControllerAnimated:YES completion:^{
      resolve(nil);
      __strong typeof(self) strongSelf = weakSelf;
      if (strongSelf) {
        if (strongSelf.redirectResolve) {
          strongSelf.redirectResolve(@{
            @"type": @"dismiss",
          });
        }
        [strongSelf flowDidFinish];
      }
    }];
  });
}

- (BOOL)isPreviewAvailable:(UMPromiseRejectBlock)reject {
  if (NSClassFromString(@"SKStoreProductViewController") == nil) {
    reject(@"E_STORE_REVIEW_PREVIEW_UNSUPPORTED", @"Store preview is not supported.", nil);
    return NO;
  }
  #if TARGET_IPHONE_SIMULATOR
  reject(@"E_STORE_REVIEW_PREVIEW_UNSUPPORTED", @"Store preview is not supported in the simulator.", nil);
  return NO;
  #endif
  return YES;
}

- (BOOL)initializeControllerWithResolver:(UMPromiseResolveBlock)resolve andRejecter:(UMPromiseRejectBlock)reject {
  if (_redirectResolve) {
    reject(@"E_STORE_REVIEW_PREVIEW_IN_PROGRESS", @"Another Store Review preview is already being presented.", nil);
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
  [_controller dismissViewControllerAnimated:true completion:^{
    self->_redirectResolve(@{ @"type": @"dismiss" });
    [self flowDidFinish];
  }];
}

-(void)flowDidFinish
{
  _redirectResolve = nil;
  _redirectReject = nil;
}

- (void)setModuleRegistry:(UMModuleRegistry *)moduleRegistry
{
  _moduleRegistry = moduleRegistry;
}

+ (NSDictionary *)propertiesFromOptions:(NSDictionary *)input
{
    NSMutableDictionary *properties = [[NSMutableDictionary alloc] init];
 
    if (input[@"itemId"]) {
        properties[SKStoreProductParameterITunesItemIdentifier] = input[@"itemId"];
    }
    if (@available(iOS 11.0, *)) {
        if (input[@"productId"]) {
            properties[SKStoreProductParameterProductIdentifier] = input[@"productId"];
        }
    }
    if (input[@"affiliateToken"]) {
        properties[SKStoreProductParameterAffiliateToken] = input[@"affiliateToken"];
    }
    if (input[@"campaignToken"]) {
        properties[SKStoreProductParameterCampaignToken] = input[@"campaignToken"];
    }
    if (input[@"providerToken"]) {
        properties[SKStoreProductParameterProviderToken] = input[@"providerToken"];
    }
    if (input[@"advertisingPartnerToken"]) {
        properties[SKStoreProductParameterAdvertisingPartnerToken] = input[@"advertisingPartnerToken"];
    }
  
    return properties;
}


+ (UIColor *)convertHexColorString:(NSString *)stringToConvert {
  NSString *strippedString = [stringToConvert stringByReplacingOccurrencesOfString:@"#" withString:@""];
  NSScanner *scanner = [NSScanner scannerWithString:strippedString];
  unsigned hexNum;
  if (![scanner scanHexInt:&hexNum]) return nil;
  return [EXStoreReviewModule colorWithRGBHex:hexNum];
}

+ (UIColor *)colorWithRGBHex:(UInt32)hex {
  int r = (hex >> 16) & 0xFF;
  int g = (hex >> 8) & 0xFF;
  int b = (hex) & 0xFF;

  return [UIColor colorWithRed:r / 255.0f
                         green:g / 255.0f
                          blue:b / 255.0f
                         alpha:1.0f];
}


@end
