//  Copyright © 2019 650 Industries. All rights reserved.

#import <EXUpdates/EXUpdatesAppController.h>
#import <EXUpdates/EXUpdatesEmbeddedAppLoader.h>
#import <EXUpdates/EXUpdatesConfig.h>
#import <EXUpdates/EXUpdatesUpdate+Private.h>
#import <EXUpdates/EXUpdatesNewUpdate.h>
#import <EXUpdates/EXUpdatesUtils.h>

NS_ASSUME_NONNULL_BEGIN

@implementation EXUpdatesNewUpdate

+ (EXUpdatesUpdate *)updateWithNewManifest:(NSDictionary *)manifest
{
  EXUpdatesUpdate *update = [[EXUpdatesUpdate alloc] initWithRawManifest:manifest];

  id updateId = manifest[@"id"];
  id commitTime = manifest[@"commitTime"];
  id runtimeVersion = manifest[@"runtimeVersion"];
  id metadata = manifest[@"metadata"];
  id bundleUrlString = manifest[@"bundleUrl"];
  id assets = manifest[@"assets"];

  if (!updateId || ![updateId isKindOfClass:[NSString class]])

  NSAssert([commitTime isKindOfClass:[NSNumber class]], @"commitTime should be a number");
  NSAssert(!metadata || [metadata isKindOfClass:[NSDictionary class]], @"metadata should be null or an object");
  NSAssert(assets && [assets isKindOfClass:[NSArray class]], @"assets should be a nonnull array");

  NSUUID *uuid;
  if (!updateId || ![updateId isKindOfClass:[NSString class]]) {
    uuid = [NSUUID UUID];
  } else {
    uuid = [[NSUUID alloc] initWithUUIDString:(NSString *)updateId];
    NSAssert(uuid, @"update ID should be a valid UUID");
  }

  NSURL *bundleUrl;
  if (!bundleUrlString || ![bundleUrlString isKindOfClass:[NSString class]]) {
    bundleUrl = [NSBundle.mainBundle URLForResource:kEXUpdatesEmbeddedBundleFilename withExtension:kEXUpdatesEmbeddedBundleFileType];
  } else {
    bundleUrl = [NSURL URLWithString:bundleUrlString];
    NSAssert(bundleUrl, @"bundleUrl should be a valid URL");
  }

  if (!runtimeVersion || ![runtimeVersion isKindOfClass:[NSString class]]) {
    runtimeVersion = [EXUpdatesUtils getRuntimeVersion];
  }

  NSMutableArray<EXUpdatesAsset *> *processedAssets = [NSMutableArray new];
  EXUpdatesAsset *jsBundleAsset = [[EXUpdatesAsset alloc] initWithUrl:bundleUrl type:kEXUpdatesEmbeddedBundleFileType];
  jsBundleAsset.isLaunchAsset = YES;
  jsBundleAsset.mainBundleFilename = kEXUpdatesEmbeddedBundleFilename;
  // TODO: fix this for spoofed bundleUrl
  jsBundleAsset.filename = [NSString stringWithFormat:@"%@.%@",
                              [EXUpdatesUtils sha256WithData:[[bundleUrl absoluteString] dataUsingEncoding:NSUTF8StringEncoding]],
                              kEXUpdatesEmbeddedBundleFileType];
  [processedAssets addObject:jsBundleAsset];

  // TODO: fix this
  NSURL *bundledAssetBaseUrl = [NSURL URLWithString:@"https://d1wp6m56sqw74a.cloudfront.net/~assets/"];

  for (NSDictionary *assetDict in (NSArray *)assets) {
    NSAssert([assetDict isKindOfClass:[NSDictionary class]], @"assets must be objects");
    id urlString = assetDict[@"url"];
    id type = assetDict[@"type"];
    id metadata = assetDict[@"metadata"];
    id mainBundleFilename = assetDict[@"name"];
    NSAssert(type && [type isKindOfClass:[NSString class]], @"asset type should be a nonnull string");

    NSURL *url;
    if (urlString && [urlString isKindOfClass:[NSString class]]) {
      url = [NSURL URLWithString:(NSString *)urlString];
      NSAssert(url, @"asset url should be a valid URL");
    } else {
      url = [bundledAssetBaseUrl URLByAppendingPathComponent:assetDict[@"packagerHash"]];
      urlString = url.absoluteString;
    }

    EXUpdatesAsset *asset = [[EXUpdatesAsset alloc] initWithUrl:url type:(NSString *)type];

    if (metadata) {
      NSAssert([metadata isKindOfClass:[NSDictionary class]], @"asset metadata should be an object");
      asset.metadata = (NSDictionary *)metadata;
    }

    if (mainBundleFilename) {
      NSAssert([mainBundleFilename isKindOfClass:[NSString class]], @"asset localPath should be a string");
      asset.mainBundleFilename = (NSString *)mainBundleFilename;
    }

    asset.filename = [NSString stringWithFormat:@"%@.%@",
                        [EXUpdatesUtils sha256WithData:[(NSString *)urlString dataUsingEncoding:NSUTF8StringEncoding]],
                        type];

    [processedAssets addObject:asset];
  }

  update.updateId = uuid;
  update.commitTime = [NSDate dateWithTimeIntervalSince1970:[(NSNumber *)commitTime doubleValue] / 1000];
  update.runtimeVersion = (NSString *)runtimeVersion;
  if (metadata) {
    update.metadata = (NSDictionary *)metadata;
  }
  update.status = EXUpdatesUpdateStatusPending;
  update.keep = YES;
  update.bundleUrl = bundleUrl;
  update.assets = processedAssets;

  return update;
}

@end

NS_ASSUME_NONNULL_END
