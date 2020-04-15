const fs = require('fs');
const http = require('http');
const path = require('path');

const packagerUrl = process.argv[2];
const destinationDir = process.argv[3];

(async function() {
  const assetsJson = await new Promise(function(resolve, reject) {
    http.get(packagerUrl, function(res) {
      if (res.statusCode !== 200) {
        reject(new Error('Request to packager server failed: ' + res.statusCode));
        res.resume();
        return;
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', function(chunk) {
        rawData += chunk;
      });
      res.on('end', function() {
        resolve(rawData);
      });
    });
  });

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

  function addAsset(name, type, packagerHash) {
    manifest.assets.push({ name, type, packagerHash });
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
})().catch(e => {
  console.error(e);
  process.exit(1);
});
