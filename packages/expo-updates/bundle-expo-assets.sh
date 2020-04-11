#!/usr/bin/env bash

set -eo pipefail

export NODE_BINARY=node
../node_modules/react-native/scripts/react-native-xcode.sh

dest="$CONFIGURATION_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH"
curl -o "$dest/embedded-assets.json" "http://localhost:8081/index.assets?platform=ios"
