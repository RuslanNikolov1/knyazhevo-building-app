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

// Car pixel detection - very dark pixels
function isCarPixel(r, g, b, a = 255) {
  const brightness = (r + g + b) / 3;
  return brightness < 80 && a > 200;
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
  
  // More precise row detection using density of dark pixels
  // Create a density map by sampling
  const densityMap = new Array(height).fill(0);
  const sampleStep = 10;
  
  for (let y = 0; y < height; y += sampleStep) {
    let darkCount = 0;
    for (let x = 0; x < width; x += sampleStep) {
      const index = (y * width + x) * channels;
      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];
      const brightness = (r + g + b) / 3;
      
      if (brightness < 100) {
        darkCount++;
      }
    }
    densityMap[y] = darkCount;
  }
  
  // Find peaks in density (garage rows)
  const peaks = [];
  for (let y = sampleStep; y < height - sampleStep; y += sampleStep) {
    const prev = densityMap[y - sampleStep] || 0;
    const curr = densityMap[y] || 0;
    const next = densityMap[y + sampleStep] || 0;
    
    // Peak detection: current is higher than neighbors
    if (curr > prev && curr > next && curr > 50) {
      peaks.push({ y, density: curr });
    }
  }
  
  // Group peaks into rows (peaks within 200 pixels are same row)
  const rows = [];
  let currentRowPeaks = [];
  
  for (const peak of peaks) {
    if (currentRowPeaks.length === 0 || peak.y - currentRowPeaks[currentRowPeaks.length - 1].y < 200) {
      currentRowPeaks.push(peak);
    } else {
      // Finalize current row
      if (currentRowPeaks.length > 0) {
        const minY = Math.min(...currentRowPeaks.map(p => p.y));
        const maxY = Math.max(...currentRowPeaks.map(p => p.y));
        rows.push({ startY: minY - 100, endY: maxY + 100 });
      }
      currentRowPeaks = [peak];
    }
  }
  if (currentRowPeaks.length > 0) {
    const minY = Math.min(...currentRowPeaks.map(p => p.y));
    const maxY = Math.max(...currentRowPeaks.map(p => p.y));
    rows.push({ startY: minY - 100, endY: maxY + 100 });
  }
  
  // Take top 3 rows
  rows.sort((a, b) => a.startY - b.startY);
  const top3Rows = rows.slice(0, 3);
  
  console.log('Detected garage rows:');
  top3Rows.forEach((row, idx) => {
    console.log(`  Row ${idx + 1}: y=${row.startY} to ${row.endY} (height=${row.endY - row.startY})`);
  });
  
  // For each row, find all garage boundaries
  const garageLayouts = [];
  
  for (let rowIdx = 0; rowIdx < top3Rows.length; rowIdx++) {
    const row = top3Rows[rowIdx];
    const midY = Math.floor((row.startY + row.endY) / 2);
    
    // More aggressive boundary detection
    // Look for vertical lines that are consistently light
    const boundaryScores = new Array(width).fill(0);
    
    // Sample multiple Y positions in the row
    for (let y = row.startY; y < row.endY; y += 20) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * channels;
        const r = pixels[index];
        const g = pixels[index + 1];
        const b = pixels[index + 2];
        const brightness = (r + g + b) / 3;
        
        // Score higher for light pixels
        if (brightness > 220) {
          boundaryScores[x] += 1;
        }
      }
    }
    
    // Find boundaries where score is high (many light pixels)
    const threshold = (row.endY - row.startY) / 20 * 0.5; // At least 50% of samples
    const boundaries = [];
    
    let inBoundary = false;
    let boundaryStart = 0;
    
    for (let x = 0; x < width; x++) {
      if (boundaryScores[x] > threshold) {
        if (!inBoundary) {
          inBoundary = true;
          boundaryStart = x;
        }
      } else {
        if (inBoundary) {
          // End of boundary - use the middle
          boundaries.push(Math.floor((boundaryStart + x) / 2));
          inBoundary = false;
        }
      }
    }
    if (inBoundary) {
      boundaries.push(Math.floor((boundaryStart + width) / 2));
    }
    
    // Create garages between boundaries
    const garages = [];
    
    // Start from left edge if first boundary is far
    let startX = 0;
    if (boundaries.length > 0 && boundaries[0] > 300) {
      garages.push({ index: 0, startX: 0, endX: boundaries[0] });
      startX = boundaries[0];
    }
    
    for (let i = 0; i < boundaries.length - 1; i++) {
      const garageStart = boundaries[i];
      const garageEnd = boundaries[i + 1];
      const garageWidth = garageEnd - garageStart;
      
      if (garageWidth > 80) { // Minimum width
        garages.push({
          index: garages.length,
          startX: garageStart,
          endX: garageEnd,
          width: garageWidth
        });
      }
    }
    
    // Add final garage if last boundary is far from right edge
    if (boundaries.length > 0) {
      const lastBoundary = boundaries[boundaries.length - 1];
      if (lastBoundary < width - 300) {
        garages.push({
          index: garages.length,
          startX: lastBoundary,
          endX: width
        });
      }
    }
    
    garageLayouts.push({
      rowIndex: rowIdx,
      startY: row.startY,
      endY: row.endY,
      garages
    });
    
    console.log(`\nRow ${rowIdx + 1} has ${garages.length} garages:`);
    garages.forEach((g, idx) => {
      console.log(`  Garage ${idx + 1} (index ${g.index}): x=${g.startX}-${g.endX} (width=${g.endX - g.startX})`);
    });
  }
  
  // Apply colors
  console.log('\nApplying colors...');
  let pixelsModified = 0;
  
  for (let rowIdx = 0; rowIdx < garageLayouts.length; rowIdx++) {
    const layout = garageLayouts[rowIdx];
    const garages = layout.garages;
    
    if (garages.length === 0) {
      console.log(`  Skipping row ${rowIdx + 1} - no garages`);
      continue;
    }
    
    for (let y = layout.startY; y < layout.endY; y++) {
      for (let x = 0; x < width; x++) {
        let garageIndex = -1;
        for (let g = 0; g < garages.length; g++) {
          if (x >= garages[g].startX && x < garages[g].endX) {
            garageIndex = garages[g].index;
            break;
          }
        }
        
        if (garageIndex === -1) continue;
        
        const index = (y * width + x) * channels;
        const r = pixels[index];
        const g = pixels[index + 1];
        const b = pixels[index + 2];
        const a = channels === 4 ? pixels[index + 3] : 255;
        
        if (isCarPixel(r, g, b, a)) {
          let targetColor = null;
          
          if (rowIdx === 0) {
            // First row: 1st = blue, rest = red
            if (garageIndex === 0) {
              targetColor = colors.blue;
            } else {
              targetColor = colors.red;
            }
          } else if (rowIdx === 1) {
            // Second row: 1st(0), 6th(5), 11th(10), 13th(12) = light blue
            // 2nd(1), 3rd(2), 4th(3), 5th(4), 7th(6), 8th(7), 9th(8), 10th(9) = yellow
            if ([0, 5, 10, 12].includes(garageIndex)) {
              targetColor = colors.lightBlue;
            } else if ([1, 2, 3, 4, 6, 7, 8, 9].includes(garageIndex)) {
              targetColor = colors.yellow;
            }
          } else if (rowIdx === 2) {
            // Last row: 1st = red, rest = orange
            if (garageIndex === 0) {
              targetColor = colors.red;
            } else {
              targetColor = colors.orange;
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
    
    console.log(`  Row ${rowIdx + 1}: Modified pixels`);
  }
  
  console.log(`\nTotal pixels modified: ${pixelsModified}`);
  
  // Save
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
  
  console.log('Done!');
}

updateGarageColors().catch(console.error);






