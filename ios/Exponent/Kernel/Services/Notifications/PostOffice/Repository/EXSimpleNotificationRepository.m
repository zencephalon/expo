//  Copyright © 2019-present 650 Industries. All rights reserved.

#import "EXSimpleNotificationRepository.h"

@interface EXSimpleNotificationRepository()

@property (nonatomic) NSUserDefaults *foregroundNotifications;

@property (nonatomic) NSUserDefaults *userIntercations;

@end

@implementation EXSimpleNotificationRepository

- (instancetype)init
{
  if (self = [super init]) {
    self.foregroundNotifications = [[NSUserDefaults alloc] initWithSuiteName:@"EX_POST_OFFICE_FN"];
    self.userIntercations = [[NSUserDefaults alloc] initWithSuiteName:@"EX_POST_OFFICE_UI"];
  }
  return self;
}

- (void)addForegroundNotificationForExperienceId:(NSString *)experienceId foregroundNotification:(NSBundle *)foregroundNotification
{
  NSMutableArray<NSBundle*> *notificationList = [[self.foregroundNotifications arrayForKey:experienceId] mutableCopy];
  if (!notificationList) {
    notificationList = [NSMutableArray<NSBundle *> new];
  }
  
  [notificationList addObject:foregroundNotification];
  [self.foregroundNotifications setObject:notificationList forKey:experienceId];
}

- (void)addUserInteractionForExperienceId:(NSString *)experienceId userInteraction:(NSBundle*)userInteraction
{
  NSMutableArray<NSBundle*> *userInteractionList = [[self.userIntercations arrayForKey:experienceId] mutableCopy];
  if (!userInteractionList) {
    userInteractionList = [NSMutableArray<NSBundle *> new];
  }
  
  [userInteractionList addObject:userInteraction];
  [self.userIntercations setObject:userInteractionList forKey:experienceId];
}

- (NSArray<NSBundle *> *)getForegroundNotificationsForExperienceId:(NSString *)experienceId
{
  NSMutableArray<NSBundle*> *notificationList = [[self.foregroundNotifications arrayForKey:experienceId] mutableCopy];
  if (!notificationList) {
    notificationList = [NSMutableArray<NSBundle *> new];
  }
  
  [self.foregroundNotifications setObject:@[] forKey:experienceId];
  return notificationList;
}

- (NSArray<NSBundle *> *)getUserInterationsForExperienceId:(NSString *)experienceId
{
  NSMutableArray<NSBundle*> *userInteractionList = [[self.userIntercations arrayForKey:experienceId] mutableCopy];
  if (!userInteractionList) {
    userInteractionList = [NSMutableArray<NSBundle *> new];
  }
  
  [self.userIntercations setObject:@[] forKey:experienceId];
  return userInteractionList;
}

@end
