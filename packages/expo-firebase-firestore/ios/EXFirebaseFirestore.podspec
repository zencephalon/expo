require 'json'

package = JSON.parse(File.read(File.join(__dir__, '..', 'package.json')))

Pod::Spec.new do |s|
  s.name           = 'EXFirebaseFirestore'
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.source         = { git: 'https://github.com/expo/expo.git' }
  #s.source_files   = "RNFBFirestore/**/*.{h,m}"

  s.dependency 'EXFirebaseApp'
  s.dependency 'RNFBApp'
  s.dependency 'RNFBFirestore'
end
