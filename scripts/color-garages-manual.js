import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const colors = {
  blue: '#0800ff',
  red: '#ff0116',
  lightBlue: '#23ecff',
  yellow: '#fcc419',
  orange: '#f08c00'
};

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function isCarPixel(r, g, b) {
  const brightness = (r + g + b) / 3;
  return brightness < 80;
}

async function colorGarages() {
  const inputPath = join(__dirname, '../public/+0.00-1.png');
  const outputPath = join(__dirname, '../public/+0.00-1.png');
  
  console.log('Loading image...');
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const { width, height } = metadata;
  
  console.log(`Dimensions: ${width}x${height}`);
  
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  
  const pixels = new Uint8Array(data);
  const channels = info.channels;
  
  // Process image: identify car pixels and apply colors based on position
  // We'll use a grid-based approach where we divide the image into regions
  // and apply colors based on which region contains car pixels
  
  console.log('Processing pixels...');
  let modified = 0;
  
  // Define approximate row regions (will be refined)
  // Based on typical floor plan: garages are usually in distinct horizontal bands
  const row1Y = { start: Math.floor(height * 0.20), end: Math.floor(height * 0.35) };
  const row2Y = { start: Math.floor(height * 0.45), end: Math.floor(height * 0.60) };
  const row3Y = { start: Math.floor(height * 0.70), end: Math.floor(height * 0.85) };
  
  // For each pixel, determine if it's a car and which garage it belongs to
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * channels;
      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];
      const a = channels === 4 ? pixels[index + 3] : 255;
      
      if (!isCarPixel(r, g, b) || a < 200) continue;
      
      let targetColor = null;
      let row = -1;
      let garageNum = -1;
      
      // Determine which row
      if (y >= row1Y.start && y < row1Y.end) {
        row = 0;
        // Estimate garage number based on x position
        // Assuming ~13 garages, each about width/13 wide
        garageNum = Math.floor((x / width) * 13);
      } else if (y >= row2Y.start && y < row2Y.end) {
        row = 1;
        garageNum = Math.floor((x / width) * 13);
      } else if (y >= row3Y.start && y < row3Y.end) {
        row = 2;
        garageNum = Math.floor((x / width) * 13);
      }
      
      if (row === -1) continue;
      
      // Apply color based on row and garage number
      if (row === 0) {
        // First row: 1st (0) = blue, rest = red
        targetColor = garageNum === 0 ? colors.blue : colors.red;
      } else if (row === 1) {
        // Second row: 1st(0), 6th(5), 11th(10), 13th(12) = light blue
        // 2nd(1), 3rd(2), 4th(3), 5th(4), 7th(6), 8th(7), 9th(8), 10th(9) = yellow
        if ([0, 5, 10, 12].includes(garageNum)) {
          targetColor = colors.lightBlue;
        } else if ([1, 2, 3, 4, 6, 7, 8, 9].includes(garageNum)) {
          targetColor = colors.yellow;
        }
      } else if (row === 2) {
        // Last row: 1st (0) = red, rest = orange
        targetColor = garageNum === 0 ? colors.red : colors.orange;
      }
      
      if (targetColor) {
        const rgb = hexToRgb(targetColor);
        if (rgb) {
          pixels[index] = rgb.r;
          pixels[index + 1] = rgb.g;
          pixels[index + 2] = rgb.b;
          modified++;
        }
      }
    }
  }
  
  console.log(`Modified ${modified} pixels`);
  
  console.log('Saving...');
  await sharp(pixels, {
    raw: { width, height, channels }
  }).png().toFile(outputPath);
  
  console.log('Done!');
}

colorGarages().catch(console.error);







