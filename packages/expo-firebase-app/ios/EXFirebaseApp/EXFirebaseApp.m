// Copyright 2018-present 650 Industries. All rights reserved.

#import <UMCore/UMUtilities.h>
#import <EXFirebaseApp/EXFirebaseApp.h>
#import <EXFirebaseApp/EXFirebaseApp+FIROptions.h>
#import <UMConstantsInterface/UMConstantsInterface.h>

#define DEFAULT_APP_NAME @"__FIRAPP_DEFAULT"

@interface EXFirebaseApp ()

@property (nonatomic, weak) UMModuleRegistry *moduleRegistry;
@property (nonatomic, weak) id<UMConstantsInterface> constants;

@end

@implementation EXFirebaseApp

UM_EXPORT_MODULE(ExpoFirebaseApp);

- (void)setModuleRegistry:(UMModuleRegistry *)moduleRegistry
{
  _moduleRegistry = moduleRegistry;
  _constants = [moduleRegistry getModuleImplementingProtocol:@protocol(UMConstantsInterface)];

  NSString* defaultName = [self getDefaultAppName];
  FIROptions* defaultOptions = [self getDefaultAppOptions];
  
  // Delete all previously created apps, except for the "default" one
  // which will be updated/created/deleted only when it has changed
  NSDictionary<NSString *,FIRApp *>* apps = [FIRApp allApps];
  NSArray<NSString*>* names = [apps allKeys];
  for (int i = 0; i < names.count; i++) {
    NSString* name = names[i];
    if (![name isEqualToString:defaultName] || !defaultName || !defaultOptions) {
      [[FIRApp appNamed:name] deleteApp:^(BOOL success) {
        if (!success) {
          NSLog(@"Failed to delete Firebase app: %@", name);
        } else {
          NSLog(@"Deleted Firebase app: %@", name);
        }
      }];
    }
  }
  
  // Initialize the default app. This will delete/create/update the app
  // if it has changed, and leaves the app untouched when the config
  // is the same.
  if (defaultName && defaultOptions) {
    [self.class updateAppWithOptions:defaultOptions name:defaultName completion:^(BOOL success) {
      if (!success) {
        NSLog(@"Failed to initialize default Firebase app: %@", defaultName);
      } else {
        NSLog(@"Initialized default Firebase app: %@", defaultName);
      }
    }];
  }
}

- (BOOL) isSandboxed
{
  NSString* appOwnership = _constants ? _constants.constants[@"appOwnership"] : nil;
  return [@"expo" isEqualToString: appOwnership];
}

- (NSDictionary *)constantsToExport
{
  NSMutableDictionary* constants = [NSMutableDictionary dictionaryWithDictionary:@{
    @"DEFAULT_NAME": [self getDefaultAppName]
  }];
  
  FIROptions* options = [self getDefaultAppOptions];
  if (options) {
    [constants setObject:[self.class firOptionsToJSON:options] forKey:@"DEFAULT_OPTIONS"];
  }
  
  return constants;
}

- (nonnull NSString*) getDefaultAppName
{
  if (self.isSandboxed) {
    // TODO
    return @"__sandbox_todoExperienceId";
  }
  return DEFAULT_APP_NAME;
}

- (nullable FIROptions*) getDefaultAppOptions
{
  NSDictionary* googleServicesFile = self.isSandboxed
  ? [self.class googleServicesFileFromConstantsManifest:_constants]
    : self.class.googleServicesFileFromBundle;
  return [self.class firOptionsWithGoogleServicesFile:googleServicesFile];
}

- (BOOL) isAppAccessible:(nonnull NSString*)name
{
  // Deny access to the [DEFAULT] app on sandboxed environments
  if (self.isSandboxed) {
    if ([name isEqualToString:DEFAULT_APP_NAME]) {
      return NO;
    }
  }
  return YES;
}

+ (void) updateAppWithOptions:(nullable FIROptions*)options name:(nonnull NSString*)name completion:(nonnull FIRAppVoidBoolCallback)completion
{
  // Default app
  FIRApp* app = [FIRApp appNamed:name];
  if (!options) {
    if (app) {
      [app deleteApp:completion];
      return;
    }
  } else {
    if (app) {
      if (![self.class firOptionsIsEqualTo:app.options compareTo:options]) {
        [app deleteApp:^(BOOL success) {
          [FIRApp configureWithName:name options:options];
          completion(YES);
        }];
        return;
      }
    } else {
      [FIRApp configureWithName:name options:options];
    }
  }
  completion(YES);
}

- (void)reject:(UMPromiseRejectBlock)reject withException:(NSException *)exception {
  NSError *error = [NSError errorWithDomain:@"ERR_FIREBASE_APP" code:4815162342 userInfo:@{
        @"message": exception.reason,
        @"code": exception.name,
    }];
  reject(exception.name, exception.reason, error);
}

- (nullable FIRApp *)getAppOrReject:(NSString*)name reject:(UMPromiseRejectBlock)reject
{
  if (name == nil) {
    name = [self getDefaultAppName];
  }
  
  if (![self isAppAccessible:name]) {
    reject(@"ERR_FIREBASE_APP", @"The Firebase app is not accessible.", nil);
    return nil;
  }
  
  FIRApp *app = [FIRApp appNamed:name];
  if (app != nil) return app;
  reject(@"ERR_FIREBASE_APP", @"The 'default' Firebase app is not initialized. Ensure your app has a valid GoogleService-Info.plist bundled and your project has react-native-unimodules installed.", nil);
  return nil;
}

UM_EXPORT_METHOD_AS(initializeAppAsync,
                    initializeAppAsync:(nullable NSDictionary *)json
                    name:(nullable NSString*)name
                    resolve:(UMPromiseResolveBlock)resolve
                    reject:(UMPromiseRejectBlock)reject)
{
  if (name && !json) {
    reject(@"ERR_FIREBASE_APP", @"No options provided for named Firebase app", nil);
    return;
  }
  if (!name) {
    name = [self getDefaultAppName];
    if (!name) {
      reject(@"ERR_FIREBASE_APP", @"No `GoogleService-Info.plist` configured", nil);
      return;
    }
  }
  if ([self isAppAccessible:name]) {
    reject(@"ERR_FIREBASE_APP", @"Access to the Firebase app is forbidden", nil);
    return;
  }
  
  FIROptions* options = json
    ? [self.class firOptionsWithJSON:json]
    : [self getDefaultAppOptions];
  
  [UMUtilities performSynchronouslyOnMainThread:^{
    [self.class updateAppWithOptions:options name:name completion:^(BOOL success) {
      if (success) {
        resolve([NSNull null]);
      } else {
        reject(@"ERR_FIREBASE_APP", @"Failed to initialize Firebase app", nil);
      }
    }];
  }];
}

UM_EXPORT_METHOD_AS(getAppAsync,
                    getAppAsync:(NSString*)name
                    resolve:(UMPromiseResolveBlock)resolve
                    reject:(UMPromiseRejectBlock)reject)
{
  FIRApp* app = [self getAppOrReject:name reject:reject];
  if (!app) return;
  resolve(@{
    @"name": app.name,
    @"options": [self.class firOptionsToJSON:app.options]
  });
}

UM_EXPORT_METHOD_AS(getAppsAsync,
                    resolve:(UMPromiseResolveBlock)resolve
                    reject:(UMPromiseRejectBlock)reject)
{
  @try {
    NSDictionary<NSString *,FIRApp *>* apps = [FIRApp allApps];
    NSArray<NSString*>* names = [apps allKeys];
    NSMutableArray* results = [NSMutableArray arrayWithCapacity:names.count];
    for (int i = 0; i < names.count; i++) {
      NSString* name = names[i];
      if ([self isAppAccessible:name]) {
        FIRApp* app = apps[name];
        [results addObject:@{
          @"name": name,
          @"options": [self.class firOptionsToJSON:app.options]
        }];
      }
    }
    resolve(results);
  } @catch (NSException *exception) {
    [self reject:reject withException:exception];
  }
}

UM_EXPORT_METHOD_AS(deleteAppAsync,
                    deleteAppAsync:(NSString*)name
                    resolve:(UMPromiseResolveBlock)resolve
                    reject:(UMPromiseRejectBlock)reject)
{
  FIRApp* app = [self getAppOrReject:name reject:reject];
  if (!app) return;
  [app deleteApp:^(BOOL success) {
    if (success) {
      resolve([NSNull null]);
    } else {
      reject(@"ERR_FIREBASE_APP", @"Failed to delete Firebase app", nil);
    }
  }];
}

@end
