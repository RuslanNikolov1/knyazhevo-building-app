import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Color mappings
const colors = {
  blue: '#0800ff',
  red: '#ff0116',
  lightBlue: '#23ecff',
  yellow: '#fcc419',
  orange: '#f08c00'
};

// Convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

async function updateGarageColors() {
  const inputPath = join(__dirname, '../public/garages-colored.png');
  const outputPath = join(__dirname, '../public/garages-colored.png');
  
  // Load image metadata
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const { width, height } = metadata;
  
  // Get raw pixel data
  const { data, info } = await image
    .raw()
    .toBuffer({ resolveWithObject: true });
  
  const pixels = new Uint8Array(data);
  const channels = info.channels;
  
  // Helper function to check if a pixel is likely a car (darker area)
  function isCarPixel(r, g, b) {
    // Cars are typically darker - check if brightness is below threshold
    const brightness = (r + g + b) / 3;
    // Also check if it's not white/very light background
    return brightness < 200 && !(r > 240 && g > 240 && b > 240);
  }
  
  // Helper function to set pixel color
  function setPixelColor(pixels, index, color) {
    const rgb = hexToRgb(color);
    if (rgb) {
      pixels[index] = rgb.r;
      pixels[index + 1] = rgb.g;
      pixels[index + 2] = rgb.b;
      if (channels === 4) {
        // Keep alpha channel if present
        pixels[index + 3] = pixels[index + 3] || 255;
      }
    }
  }
  
  // Approximate row detection - we'll need to adjust based on actual image
  // Assuming roughly equal row heights
  const rowHeight = height / 3; // 3 rows
  
  // Process each pixel
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * channels;
      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];
      
      // Determine which row
      const row = Math.floor(y / rowHeight);
      
      // Only color car pixels
      if (isCarPixel(r, g, b)) {
        let targetColor = null;
        
        if (row === 0) {
          // First row (top most)
          // Approximate garage width - adjust based on actual layout
          const garageWidth = width / 13; // Assuming ~13 garages per row
          const garageIndex = Math.floor(x / garageWidth);
          
          if (garageIndex === 0) {
            targetColor = colors.blue; // First garage: #0800ff
          } else {
            targetColor = colors.red; // Rest: #ff0116
          }
        } else if (row === 1) {
          // Second row
          const garageWidth = width / 13;
          const garageIndex = Math.floor(x / garageWidth);
          
          if ([0, 5, 10, 12].includes(garageIndex)) {
            // 1st, 6th, 11th, 13th (0-indexed: 0, 5, 10, 12)
            targetColor = colors.lightBlue; // #23ecff
          } else if ([1, 2, 3, 4, 6, 7, 8, 9].includes(garageIndex)) {
            // 2nd, 3rd, 4th, 5th, 7th, 8th, 9th, 10th (0-indexed: 1, 2, 3, 4, 6, 7, 8, 9)
            targetColor = colors.yellow; // #fcc419
          }
        } else if (row === 2) {
          // Last row
          const garageWidth = width / 13;
          const garageIndex = Math.floor(x / garageWidth);
          
          if (garageIndex === 0) {
            targetColor = colors.red; // First: #ff0116
          } else {
            targetColor = colors.orange; // Rest: #f08c00
          }
        }
        
        if (targetColor) {
          setPixelColor(pixels, index, targetColor);
        }
      }
    }
  }
  
  // Save the modified image
  await sharp(pixels, {
    raw: {
      width,
      height,
      channels: channels
    }
  })
    .png()
    .toFile(outputPath);
  
  console.log('Garage colors updated successfully!');
}

updateGarageColors().catch(console.error);








