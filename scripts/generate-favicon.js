const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create directory if it doesn't exist
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Function to generate a canvas with the "S" logo
function generateLogoCanvas(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#0f172a'; // Dark blue background
  ctx.fillRect(0, 0, size, size);
  
  // Draw a circular background
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.4, 0, Math.PI * 2);
  ctx.fillStyle = '#38bdf8'; // Light blue circle
  ctx.fill();
  
  // Draw the "S" letter
  ctx.font = `bold ${size * 0.5}px Arial`;
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('S', size / 2, size / 2 + size * 0.02); // Slight adjustment for vertical centering
  
  return canvas;
}

// Generate icons of various sizes
const iconSizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];

iconSizes.forEach(size => {
  // Generate icon
  const canvas = generateLogoCanvas(size);
  const buffer = canvas.toBuffer('image/png');
  
  // Determine filename based on size
  let filename;
  if (size === 16) {
    filename = 'favicon-16x16.png';
  } else if (size === 32) {
    filename = 'favicon-32x32.png';
  } else {
    filename = `icon-${size}x${size}.png`;
  }
  
  // Write file
  fs.writeFileSync(path.join(iconsDir, filename), buffer);
  console.log(`Generated ${filename}`);
});

// Generate Apple Touch Icon (180x180)
const appleTouchCanvas = generateLogoCanvas(180);
const appleTouchBuffer = appleTouchCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(iconsDir, 'apple-touch-icon.png'), appleTouchBuffer);
console.log('Generated apple-touch-icon.png');

// Generate maskable icon (special format for Android)
const maskableCanvas = createCanvas(512, 512);
const ctx = maskableCanvas.getContext('2d');

// Full background for maskable icon (needs to extend to edges)
ctx.fillStyle = '#0f172a'; // Dark blue background
ctx.fillRect(0, 0, 512, 512);

// Draw a larger circular background (safe zone is 40% from center)
ctx.beginPath();
ctx.arc(256, 256, 256 * 0.6, 0, Math.PI * 2);
ctx.fillStyle = '#38bdf8'; // Light blue circle
ctx.fill();

// Draw the "S" letter (slightly smaller than normal)
ctx.font = `bold ${512 * 0.4}px Arial`;
ctx.fillStyle = 'white';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('S', 256, 256 + 10); // Slight adjustment for vertical centering

const maskableBuffer = maskableCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(iconsDir, 'maskable-icon.png'), maskableBuffer);
console.log('Generated maskable-icon.png');

console.log('All favicon assets generated successfully!'); 