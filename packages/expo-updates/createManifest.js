const fs = require('fs');
const path = require('path');

const assetsJson = process.argv[2];
const destinationDir = process.argv[3];

let assets;
try {
  assets = JSON.parse(assetsJson);
} catch (e) {
  throw new Error(
    "Error parsing assets JSON from React Native packager. Ensure you've followed all expo-updates installation steps correctly. " +
      e.message
  );
}

const manifest = {
  commitTime: new Date().getTime(),
  assets: [],
};

function addAsset(name, type, hash) {
  manifest.assets.push({ name, type, hash });
}

assets.forEach(function(asset) {
  asset.scales.forEach(function(scale, index) {
    if (scale === 1) {
      addAsset(asset.name, asset.type, asset.fileHashes[index]);
    } else {
      addAsset(asset.name + '@' + scale + 'x', asset.type, asset.fileHashes[index]);
    }
  });
});

fs.writeFileSync(path.join(destinationDir, 'app.manifest'), JSON.stringify(manifest));
