// Copyright 2019-present 650 Industries. All rights reserved.

#pragma once

#include <ReactCommon/RCTTurboModule.h>

namespace unimodules {

class JSI_EXPORT EventEmitterSpecJSI : public facebook::react::ObjCTurboModule {
public:
  EventEmitterSpecJSI(id instance, std::shared_ptr<facebook::react::JSCallInvoker> jsInvoker);
};

} // namespace unimodules
