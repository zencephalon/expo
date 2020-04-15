#!/usr/bin/env bash

set -eo pipefail

export NODE_BINARY=node
../node_modules/react-native/scripts/react-native-xcode.sh

DEST="$CONFIGURATION_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH"
ASSETS_URL="http://localhost:8081/index.assets?platform=ios"

"$NODE_BINARY" ../node_modules/expo-updates/createManifest.js "$ASSETS_URL" "$DEST"
