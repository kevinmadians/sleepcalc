const fs = require('fs');
const path = require('path');
const pngToIco = require('png-to-ico');

// Path to the PNG files
const favicon16Path = path.join(__dirname, '../public/icons/favicon-16x16.png');
const favicon32Path = path.join(__dirname, '../public/icons/favicon-32x32.png');

// Path for the output ICO file
const faviconIcoPath = path.join(__dirname, '../public/favicon.ico');

// Check if the PNG files exist
if (!fs.existsSync(favicon16Path) || !fs.existsSync(favicon32Path)) {
  console.error('Error: Favicon PNG files not found. Run generate-favicon.js first.');
  process.exit(1);
}

// Convert PNG to ICO (using both sizes for multi-size ICO)
pngToIco([favicon32Path, favicon16Path])
  .then(buf => {
    fs.writeFileSync(faviconIcoPath, buf);
    console.log('Successfully created favicon.ico with multiple sizes!');
  })
  .catch(err => {
    console.error('Error creating favicon.ico:', err);
  }); 