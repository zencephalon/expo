const fs = require('fs');
const path = require('path');

/**
 * Create or update a symbolic link in `pages/versions/latest`.
 * This makes sure the latest URL is always referring the version from `package.json`.
 */
function updateLatestLink(version) {
  const source = path.resolve(__dirname, `../pages/versions/v${version}`);
  const target = path.resolve(__dirname, '../pages/versions/latest');

  try {
    fs.unlinkSync(target);
    console.log('🗑  Removed old symlink /versions/latest...');
  } catch {
    console.log('🗑  No existing symlink /versions/latest found...');
  }

  fs.symlinkSync(source, target, 'dir');
  console.log(`🔗 Updated symlink /versions/latest to /versions/v${version}`);
}

module.exports = { updateLatestLink };
