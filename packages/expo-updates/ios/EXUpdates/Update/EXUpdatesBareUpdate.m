//  Copyright © 2019 650 Industries. All rights reserved.

#import <EXUpdates/EXUpdatesAppController.h>
#import <EXUpdates/EXUpdatesConfig.h>
#import <EXUpdates/EXUpdatesBareUpdate.h>
#import <EXUpdates/EXUpdatesUpdate+Private.h>
#import <EXUpdates/EXUpdatesUtils.h>

NS_ASSUME_NONNULL_BEGIN

static NSString * const kEXUpdatesBareUpdateBundleFilename = @"main";
static NSString * const kEXUpdatesBareUpdateBundleFileType = @"jsbundle";

@implementation EXUpdatesBareUpdate

+ (EXUpdatesUpdate *)updateFromMainBundle
{
  NSString *jsBundlePath = [NSBundle.mainBundle pathForResource:kEXUpdatesBareUpdateBundleFilename ofType:kEXUpdatesBareUpdateBundleFileType];
  NSError *error;
  NSDictionary<NSFileAttributeKey, id> *attributes = [NSFileManager.defaultManager attributesOfItemAtPath:jsBundlePath error:&error];
  NSAssert(!error, @"wheeeeee TODO fix this");
  NSDate *creationDate = attributes[NSFileCreationDate];
  EXUpdatesUpdate *update = [EXUpdatesUpdate updateWithId:[NSUUID UUID]
                                               commitTime:creationDate
                                           runtimeVersion:[EXUpdatesUtils getRuntimeVersion]
                                                 metadata:@{}
                                                   status:EXUpdatesUpdateStatusPending
                                                     keep:YES];

  EXUpdatesAsset *bundleAsset = [[EXUpdatesAsset alloc] initWithUrl:[NSBundle.mainBundle    URLForResource:kEXUpdatesBareUpdateBundleFilename withExtension:kEXUpdatesBareUpdateBundleFileType] type:kEXUpdatesBareUpdateBundleFileType];
  bundleAsset.mainBundleFilename = kEXUpdatesBareUpdateBundleFilename;
  bundleAsset.filename = [NSUUID UUID].UUIDString;
  update.assets = @[bundleAsset];

  return update;
}

@end

NS_ASSUME_NONNULL_END

