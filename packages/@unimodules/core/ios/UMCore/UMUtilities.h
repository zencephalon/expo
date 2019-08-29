// Copyright © 2018 650 Industries. All rights reserved.

#import <UIKit/UIKit.h>
#import <UMCore/UMInternalModule.h>
#import <UMCore/UMUtilitiesInterface.h>
#import <UMCore/UMModuleRegistryConsumer.h>

@interface UMUtilities : NSObject <UMInternalModule, UMUtilitiesInterface, UMModuleRegistryConsumer>

+ (void)performSynchronouslyOnMainThread:(nonnull void (^)(void))block;
+ (CGFloat)screenScale;
+ (nullable UIColor *)UIColor:(nullable id)json;
+ (nullable NSDate *)NSDate:(nullable id)json;
+ (nonnull NSString *)hexStringWithCGColor:(nonnull CGColorRef)color;
+ (void)dismissViewController:(nullable UIViewController *)controller animated:(BOOL)animated callback:(void (^ __nullable)(void))callback resolver:(nonnull UMPromiseResolveBlock)resolve rejecter:(nonnull UMPromiseRejectBlock)reject;
- (nullable UIViewController *)currentViewController;
- (nullable NSDictionary *)launchOptions;

@end
