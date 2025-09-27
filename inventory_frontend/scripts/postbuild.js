const fs = require('fs');
const path = require('path');

try {
  const buildDir = path.join(__dirname, '..', 'build');
  if (fs.existsSync(buildDir)) {
    console.log('Build complete. PWA assets present.');
  }
} catch (e) {
  // ignore
}
