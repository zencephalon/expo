//  Copyright © 2018 650 Industries. All rights reserved.

#import <UMCore/UMExportedModule.h>
#import <UMCore/UMModuleRegistryConsumer.h>
#import <Firebase/Firebase.h>

@interface EXFirebaseApp : UMExportedModule <UMModuleRegistryConsumer>

- (nonnull instancetype) init;
- (nonnull instancetype) initWithAppName:(nonnull NSString*)name options:(nullable FIROptions*)options;

- (BOOL) isAppAccessible:(nonnull NSString*)name;

@end
