import sharp from 'sharp';
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

// Check if pixel is likely part of a car (dark area, not white/light background)
function isCarPixel(r, g, b, a = 255) {
  const brightness = (r + g + b) / 3;
  // Cars are dark - typically black or dark gray
  // Exclude very light pixels (background) and very transparent pixels
  return brightness < 120 && a > 200;
}

// Check if pixel is likely a boundary/line (very light or white)
function isBoundaryPixel(r, g, b) {
  const brightness = (r + g + b) / 3;
  return brightness > 240;
}

async function updateGarageColors() {
  const inputPath = join(__dirname, '../public/+0.00-1.png');
  const outputPath = join(__dirname, '../public/+0.00-1.png');
  
  console.log('Loading image...');
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const { width, height } = metadata;
  
  console.log(`Image dimensions: ${width}x${height}`);
  
  // Get raw pixel data with alpha channel
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  
  const pixels = new Uint8Array(data);
  const channels = info.channels; // Should be 4 (RGBA)
  
  // Analyze image to find row boundaries
  // Sample vertical positions to find where rows start/end
  const rowBoundaries = [];
  const sampleX = Math.floor(width / 2);
  
  let inGarageArea = false;
  let lastBrightness = 255;
  
  for (let y = 0; y < height; y++) {
    const index = (y * width + sampleX) * channels;
    const r = pixels[index];
    const g = pixels[index + 1];
    const b = pixels[index + 2];
    const brightness = (r + g + b) / 3;
    
    // Detect transitions between garage areas and other areas
    if (!inGarageArea && brightness < 200) {
      inGarageArea = true;
      rowBoundaries.push({ y, type: 'start' });
    } else if (inGarageArea && brightness > 240) {
      inGarageArea = false;
      rowBoundaries.push({ y, type: 'end' });
    }
    lastBrightness = brightness;
  }
  
  // Find the three main garage rows
  // Look for the largest continuous garage areas
  const garageRows = [];
  for (let i = 0; i < rowBoundaries.length - 1; i++) {
    if (rowBoundaries[i].type === 'start' && rowBoundaries[i + 1].type === 'end') {
      const startY = rowBoundaries[i].y;
      const endY = rowBoundaries[i + 1].y;
      const height = endY - startY;
      if (height > 200) { // Minimum row height
        garageRows.push({ startY, endY, height });
      }
    }
  }
  
  // Sort by Y position and take top 3
  garageRows.sort((a, b) => a.startY - b.startY);
  const top3Rows = garageRows.slice(0, 3);
  
  console.log('Detected garage rows:');
  top3Rows.forEach((row, idx) => {
    console.log(`  Row ${idx + 1}: y=${row.startY} to ${row.endY} (height=${row.height})`);
  });
  
  // For each row, find garage boundaries horizontally
  const garageLayouts = [];
  
  for (let rowIdx = 0; rowIdx < top3Rows.length; rowIdx++) {
    const row = top3Rows[rowIdx];
    const sampleY = Math.floor((row.startY + row.endY) / 2);
    
    // Find vertical boundaries (garage separators)
    const boundaries = [];
    let lastWasBoundary = false;
    
    for (let x = 0; x < width; x++) {
      const index = (sampleY * width + x) * channels;
      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];
      
      const isBoundary = isBoundaryPixel(r, g, b);
      
      // Detect boundary start
      if (!lastWasBoundary && isBoundary) {
        boundaries.push(x);
        lastWasBoundary = true;
      } else if (lastWasBoundary && !isBoundary) {
        lastWasBoundary = false;
      }
    }
    
    // Calculate garage positions based on boundaries
    const garages = [];
    for (let i = 0; i < boundaries.length - 1; i++) {
      const startX = boundaries[i];
      const endX = boundaries[i + 1];
      const garageWidth = endX - startX;
      
      // Only include garages of reasonable width (not too narrow)
      if (garageWidth > 50) {
        garages.push({
          index: garages.length,
          startX,
          endX,
          width: garageWidth
        });
      }
    }
    
    garageLayouts.push({
      rowIndex: rowIdx,
      startY: row.startY,
      endY: row.endY,
      garages
    });
    
    console.log(`Row ${rowIdx + 1} has ${garages.length} garages`);
  }
  
  // Now apply colors based on the requirements
  console.log('Applying colors...');
  let pixelsModified = 0;
  
  for (let rowIdx = 0; rowIdx < garageLayouts.length; rowIdx++) {
    const layout = garageLayouts[rowIdx];
    const garages = layout.garages;
    
    for (let y = layout.startY; y < layout.endY; y++) {
      for (let x = 0; x < width; x++) {
        // Find which garage this x position belongs to
        let garageIndex = -1;
        for (let g = 0; g < garages.length; g++) {
          if (x >= garages[g].startX && x < garages[g].endX) {
            garageIndex = g;
            break;
          }
        }
        
        if (garageIndex === -1) continue; // Not in a garage area
        
        const index = (y * width + x) * channels;
        const r = pixels[index];
        const g = pixels[index + 1];
        const b = pixels[index + 2];
        const a = channels === 4 ? pixels[index + 3] : 255;
        
        // Only color car pixels
        if (isCarPixel(r, g, b, a)) {
          let targetColor = null;
          
          if (rowIdx === 0) {
            // First row (top most)
            if (garageIndex === 0) {
              targetColor = colors.blue; // 1st garage: #0800ff
            } else {
              targetColor = colors.red; // Rest: #ff0116
            }
          } else if (rowIdx === 1) {
            // Second row
            // 1st, 6th, 11th, 13th (0-indexed: 0, 5, 10, 12)
            if ([0, 5, 10, 12].includes(garageIndex)) {
              targetColor = colors.lightBlue; // #23ecff
            }
            // 2nd, 3rd, 4th, 5th, 7th, 8th, 9th, 10th (0-indexed: 1, 2, 3, 4, 6, 7, 8, 9)
            else if ([1, 2, 3, 4, 6, 7, 8, 9].includes(garageIndex)) {
              targetColor = colors.yellow; // #fcc419
            }
          } else if (rowIdx === 2) {
            // Last row
            if (garageIndex === 0) {
              targetColor = colors.red; // 1st: #ff0116
            } else {
              targetColor = colors.orange; // Rest: #f08c00
            }
          }
          
          if (targetColor) {
            const rgb = hexToRgb(targetColor);
            if (rgb) {
              pixels[index] = rgb.r;
              pixels[index + 1] = rgb.g;
              pixels[index + 2] = rgb.b;
              pixelsModified++;
            }
          }
        }
      }
    }
  }
  
  console.log(`Modified ${pixelsModified} pixels`);
  
  // Save the modified image
  console.log('Saving image...');
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




