// Copyright 2000-present 650 Industries. All rights reserved.

#if __has_include(<EXFirebaseApp/EXFirebaseApp.h>)
#import <UIKit/UIKit.h>
#import <EXFirebaseApp/EXFirebaseApp.h>
#import "EXConstantsBinding.h"

NS_ASSUME_NONNULL_BEGIN

@interface EXScopedFirebaseApp : EXFirebaseApp

- (instancetype)initWithExperienceId:(NSString *)experienceId andConstantsBinding:(EXConstantsBinding *)constantsBinding;

@end

NS_ASSUME_NONNULL_END
#endif
