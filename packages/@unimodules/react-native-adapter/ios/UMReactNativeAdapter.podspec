require 'json'

package = JSON.parse(File.read(File.join(__dir__, '..', 'package.json')))

folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  s.name           = 'UMReactNativeAdapter'
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.platform       = :ios, '10.0'
  s.compiler_flags         = folly_compiler_flags
  s.source         = { git: 'https://github.com/expo/expo.git' }
  s.source_files   = 'UMReactNativeAdapter/**/*.{h,m,mm}'
  s.preserve_paths = 'UMReactNativeAdapter/**/*.{h,m,mm}'
  s.requires_arc   = true
  s.pod_target_xcconfig    = {
    "USE_HEADERMAP" => "YES",
    "CLANG_CXX_LANGUAGE_STANDARD" => "c++14",
    "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/Folly\""
  }

  s.dependency 'React-Core'
  s.dependency 'ReactCommon/turbomodule/core'
  s.dependency 'Folly'
  s.dependency 'UMCore'
  s.dependency 'UMFontInterface'
end
