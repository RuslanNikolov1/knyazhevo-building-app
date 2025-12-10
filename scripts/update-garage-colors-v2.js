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

// Enhanced car detection - looks for dark pixels that are likely cars
function isCarPixel(r, g, b, a = 255) {
  const brightness = (r + g + b) / 3;
  // Cars are typically very dark (black/dark gray)
  // Exclude light backgrounds and transparent areas
  return brightness < 100 && a > 200 && (r < 120 || g < 120 || b < 120);
}

// Check if area has car pixels (more reliable than single pixel)
function hasCarInArea(pixels, width, channels, startX, endX, startY, endY) {
  let carPixels = 0;
  let totalPixels = 0;
  
  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      const index = (y * width + x) * channels;
      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];
      const a = channels === 4 ? pixels[index + 3] : 255;
      
      totalPixels++;
      if (isCarPixel(r, g, b, a)) {
        carPixels++;
      }
    }
  }
  
  // If more than 5% of pixels are car pixels, consider it a car area
  return carPixels > totalPixels * 0.05;
}

async function updateGarageColors() {
  const inputPath = join(__dirname, '../public/+0.00-1.png');
  const outputPath = join(__dirname, '../public/+0.00-1.png');
  
  console.log('Loading image...');
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const { width, height } = metadata;
  
  console.log(`Image dimensions: ${width}x${height}`);
  
  // Get raw pixel data
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  
  const pixels = new Uint8Array(data);
  const channels = info.channels;
  
  // More precise row detection - scan for areas with many dark pixels (cars)
  // Sample multiple horizontal lines to find garage rows
  const rowCandidates = [];
  const sampleInterval = 50;
  
  for (let y = 0; y < height; y += sampleInterval) {
    let darkPixels = 0;
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * channels;
      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];
      const brightness = (r + g + b) / 3;
      
      if (brightness < 100) {
        darkPixels++;
      }
    }
    
    // If line has significant dark pixels, it might be in a garage row
    if (darkPixels > width * 0.1) {
      rowCandidates.push({ y, darkPixels });
    }
  }
  
  // Group nearby candidates into rows
  const rows = [];
  let currentRow = null;
  
  for (const candidate of rowCandidates) {
    if (!currentRow || candidate.y - currentRow.endY > 200) {
      // Start new row
      if (currentRow) {
        rows.push(currentRow);
      }
      currentRow = {
        startY: candidate.y,
        endY: candidate.y,
        darkPixelCount: candidate.darkPixels
      };
    } else {
      // Extend current row
      currentRow.endY = candidate.y;
      currentRow.darkPixelCount = Math.max(currentRow.darkPixelCount, candidate.darkPixels);
    }
  }
  if (currentRow) {
    rows.push(currentRow);
  }
  
  // Filter and sort rows - take top 3 with most dark pixels
  rows.sort((a, b) => b.darkPixelCount - a.darkPixelCount);
  const top3Rows = rows.slice(0, 3).sort((a, b) => a.startY - b.startY);
  
  console.log('Detected garage rows:');
  top3Rows.forEach((row, idx) => {
    console.log(`  Row ${idx + 1}: y=${row.startY} to ${row.endY} (height=${row.endY - row.startY})`);
  });
  
  // For each row, find garage boundaries by detecting vertical separators
  const garageLayouts = [];
  
  for (let rowIdx = 0; rowIdx < top3Rows.length; rowIdx++) {
    const row = top3Rows[rowIdx];
    const midY = Math.floor((row.startY + row.endY) / 2);
    
    // Find vertical boundaries by looking for light/white vertical lines
    const verticalBoundaries = [];
    const boundaryThreshold = 50; // Minimum consecutive light pixels to be a boundary
    
    for (let x = 0; x < width; x++) {
      let lightPixels = 0;
      for (let y = row.startY; y < row.endY; y++) {
        const index = (y * width + x) * channels;
        const r = pixels[index];
        const g = pixels[index + 1];
        const b = pixels[index + 2];
        const brightness = (r + g + b) / 3;
        
        if (brightness > 240) {
          lightPixels++;
        }
      }
      
      // If this column has many light pixels, it's likely a boundary
      if (lightPixels > (row.endY - row.startY) * 0.7) {
        if (verticalBoundaries.length === 0 || x - verticalBoundaries[verticalBoundaries.length - 1] > 20) {
          verticalBoundaries.push(x);
        }
      }
    }
    
    // Create garage segments between boundaries
    const garages = [];
    for (let i = 0; i < verticalBoundaries.length - 1; i++) {
      const startX = verticalBoundaries[i];
      const endX = verticalBoundaries[i + 1];
      const garageWidth = endX - startX;
      
      // Only include garages of reasonable width
      if (garageWidth > 100) {
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
    if (garages.length > 0) {
      console.log(`  First garage: x=${garages[0].startX}-${garages[0].endX}`);
      console.log(`  Last garage: x=${garages[garages.length - 1].startX}-${garages[garages.length - 1].endX}`);
    }
  }
  
  // Apply colors precisely
  console.log('Applying colors...');
  let pixelsModified = 0;
  
  for (let rowIdx = 0; rowIdx < garageLayouts.length; rowIdx++) {
    const layout = garageLayouts[rowIdx];
    const garages = layout.garages;
    
    if (garages.length === 0) continue;
    
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






