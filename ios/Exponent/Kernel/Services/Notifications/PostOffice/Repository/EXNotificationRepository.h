//  Copyright © 2019-present 650 Industries. All rights reserved.

#ifndef EXNotificationRepository_h
#define EXNotificationRepository_h

@protocol EXNotificationRepository <NSObject>

- (void)addForegroundNotificationForExperienceId:(NSString*)experienceId foregroundNotification:(NSBundle*)foregroundNotification;

- (void)addUserInteractionForExperienceId:(NSString*)experienceId userInteraction:(NSBundle*)userInteraction;

- (NSArray<NSBundle*>*)getForegroundNotificationsForExperienceId:(NSString*)experienceId;

- (NSArray<NSBundle*>*)getUserInterationsForExperienceId:(NSString*)experienceId;

@end

#endif /* EXNotificationRepository_h */
