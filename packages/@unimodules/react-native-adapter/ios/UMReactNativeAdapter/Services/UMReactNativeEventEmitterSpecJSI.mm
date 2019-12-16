// Copyright 2019-present 650 Industries. All rights reserved.

#import <UMReactNativeAdapter/UMReactNativeEventEmitterSpecJSI.h>
#import <UMReactNativeAdapter/UMReactNativeEventEmitter.h>
#import <ReactCommon/TurboModuleUtils.h>

namespace facebook {

/**
 * All static helper functions are ObjC++ specific.
 */
static jsi::Value convertNSNumberToJSIBoolean(jsi::Runtime &runtime, NSNumber *value)
{
  return jsi::Value((bool)[value boolValue]);
}

static jsi::Value convertNSNumberToJSINumber(jsi::Runtime &runtime, NSNumber *value)
{
  return jsi::Value([value doubleValue]);
}

static jsi::String convertNSStringToJSIString(jsi::Runtime &runtime, NSString *value)
{
  return jsi::String::createFromUtf8(runtime, [value UTF8String] ?: "");
}

static jsi::Value convertObjCObjectToJSIValue(jsi::Runtime &runtime, id value);
static jsi::Object convertNSDictionaryToJSIObject(jsi::Runtime &runtime, NSDictionary *value)
{
  jsi::Object result = jsi::Object(runtime);
  for (NSString *k in value) {
    result.setProperty(runtime, [k UTF8String], convertObjCObjectToJSIValue(runtime, value[k]));
  }
  return result;
}

static jsi::Array convertNSArrayToJSIArray(jsi::Runtime &runtime, NSArray *value)
{
  jsi::Array result = jsi::Array(runtime, value.count);
  for (size_t i = 0; i < value.count; i++) {
    result.setValueAtIndex(runtime, i, convertObjCObjectToJSIValue(runtime, value[i]));
  }
  return result;
}

static jsi::Value convertObjCObjectToJSIValue(jsi::Runtime &runtime, id value)
{
  if ([value isKindOfClass:[NSString class]]) {
    return convertNSStringToJSIString(runtime, (NSString *)value);
  } else if ([value isKindOfClass:[NSNumber class]]) {
    if ([value isKindOfClass:[@YES class]]) {
      return convertNSNumberToJSIBoolean(runtime, (NSNumber *)value);
    }
    return convertNSNumberToJSINumber(runtime, (NSNumber *)value);
  } else if ([value isKindOfClass:[NSDictionary class]]) {
    return convertNSDictionaryToJSIObject(runtime, (NSDictionary *)value);
  } else if ([value isKindOfClass:[NSArray class]]) {
    return convertNSArrayToJSIArray(runtime, (NSArray *)value);
  } else if (value == (id)kCFNull) {
    return jsi::Value::null();
  }
  return jsi::Value::undefined();
}

}

namespace unimodules {

static facebook::jsi::Value __hostFunction_EventEmitterSpecJSI_setListener(
                                                                            facebook::jsi::Runtime &rt,
                                                                            facebook::react::TurboModule &turboModule,
                                                                            const facebook::jsi::Value* args,
  size_t count)
{
  UMReactNativeEventEmitter *emitter = (UMReactNativeEventEmitter *)static_cast<facebook::react::ObjCTurboModule &>(turboModule).instance_;
  __block auto wrapper = std::make_shared<facebook::react::CallbackWrapper>(args[0].getObject(rt).getFunction(rt), rt, turboModule.jsInvoker_);
  [emitter setListener:^(NSArray *responses) {
    std::shared_ptr<react::CallbackWrapper> rw = wrapper;
    wrapper->jsInvoker().invokeAsync([rw, responses]() {
      std::vector<facebook::jsi::Value> result;

      result.emplace_back(facebook::jsi::String::createFromUtf8(rw->runtime(), [responses[0] UTF8String] ?: ""));
      result.emplace_back(facebook::convertObjCObjectToJSIValue(rw->runtime(), responses[1]));
      rw->callback().call(rw->runtime(), (const jsi::Value *)result.data(), result.size());
    });
  }];
  return facebook::jsi::Value::undefined();
}

EventEmitterSpecJSI::EventEmitterSpecJSI(
                                                 id instance,
                                             std::shared_ptr<facebook::react::JSCallInvoker> jsInvoker)
  : ObjCTurboModule("EventEmitter", instance, jsInvoker) {
  methodMap_["setListener"] = MethodMetadata {1, __hostFunction_EventEmitterSpecJSI_setListener};
}

} // namespace unimodules
