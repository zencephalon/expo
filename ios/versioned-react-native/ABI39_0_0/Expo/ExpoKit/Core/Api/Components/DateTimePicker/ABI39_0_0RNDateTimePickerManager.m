/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "ABI39_0_0RNDateTimePickerManager.h"

#import <ABI39_0_0React/ABI39_0_0RCTBridge.h>
#import <ABI39_0_0React/ABI39_0_0RCTEventDispatcher.h>
#import "ABI39_0_0RNDateTimePicker.h"
#import <ABI39_0_0React/ABI39_0_0UIView+React.h>

#if __IPHONE_OS_VERSION_MAX_ALLOWED < 130000
@interface UIColor (Xcode10)
+ (instancetype) labelColor;
@end
#endif

@implementation ABI39_0_0RCTConvert(UIDatePicker)

ABI39_0_0RCT_ENUM_CONVERTER(UIDatePickerMode, (@{
  @"time": @(UIDatePickerModeTime),
  @"date": @(UIDatePickerModeDate),
  @"datetime": @(UIDatePickerModeDateAndTime),
}), UIDatePickerModeTime, integerValue)

@end

@implementation ABI39_0_0RNDateTimePickerManager

ABI39_0_0RCT_EXPORT_MODULE()

- (UIView *)view
{
  return [ABI39_0_0RNDateTimePicker new];
}

ABI39_0_0RCT_EXPORT_VIEW_PROPERTY(date, NSDate)
ABI39_0_0RCT_EXPORT_VIEW_PROPERTY(locale, NSLocale)
ABI39_0_0RCT_EXPORT_VIEW_PROPERTY(minimumDate, NSDate)
ABI39_0_0RCT_EXPORT_VIEW_PROPERTY(maximumDate, NSDate)
ABI39_0_0RCT_EXPORT_VIEW_PROPERTY(minuteInterval, NSInteger)
ABI39_0_0RCT_EXPORT_VIEW_PROPERTY(onChange, ABI39_0_0RCTBubblingEventBlock)
ABI39_0_0RCT_REMAP_VIEW_PROPERTY(mode, datePickerMode, UIDatePickerMode)
ABI39_0_0RCT_REMAP_VIEW_PROPERTY(timeZoneOffsetInMinutes, timeZone, NSTimeZone)

ABI39_0_0RCT_CUSTOM_VIEW_PROPERTY(textColor, UIColor, ABI39_0_0RNDateTimePicker)
{
  if (json) {
    [view setValue:[ABI39_0_0RCTConvert UIColor:json] forKey:@"textColor"];
    [view setValue:@(NO) forKey:@"highlightsToday"];
  } else {
    UIColor* defaultColor;
    if (@available(iOS 13.0, *)) {
        defaultColor = [UIColor labelColor];
    } else {
        defaultColor = [UIColor blackColor];
    }
    [view setValue:defaultColor forKey:@"textColor"];
    [view setValue:@(YES) forKey:@"highlightsToday"];
  }
}

@end
