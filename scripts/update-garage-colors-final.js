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

// Enhanced car pixel detection
function isCarPixel(r, g, b, a = 255) {
  // Cars are very dark (black or dark gray)
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
  
  // Define approximate row regions based on typical floor plan structure
  // We'll use percentages of height to be more robust
  // Top row: approximately 15-25% of image height
  // Middle row: approximately 40-55% of image height  
  // Bottom row: approximately 70-85% of image height
  
  const rowRegions = [
    { name: 'Row 1', startPercent: 0.15, endPercent: 0.30 },
    { name: 'Row 2', startPercent: 0.40, endPercent: 0.55 },
    { name: 'Row 3', startPercent: 0.70, endPercent: 0.85 }
  ];
  
  // For each row, find the actual garage boundaries by scanning horizontally
  const garageLayouts = [];
  
  for (let rowIdx = 0; rowIdx < rowRegions.length; rowIdx++) {
    const region = rowRegions[rowIdx];
    const startY = Math.floor(height * region.startPercent);
    const endY = Math.floor(height * region.endPercent);
    const midY = Math.floor((startY + endY) / 2);
    
    console.log(`\nAnalyzing ${region.name}: y=${startY} to ${endY}`);
    
    // Scan horizontally to find garage boundaries
    // Look for vertical lines (light pixels) that span most of the row height
    const boundaryCandidates = [];
    
    // Sample every 5 pixels horizontally for performance
    for (let x = 0; x < width; x += 5) {
      let lightPixelCount = 0;
      let totalChecked = 0;
      
      // Check a vertical strip
      for (let y = startY; y < endY; y += 5) {
        const index = (y * width + x) * channels;
        const r = pixels[index];
        const g = pixels[index + 1];
        const b = pixels[index + 2];
        const brightness = (r + g + b) / 3;
        
        totalChecked++;
        if (brightness > 230) {
          lightPixelCount++;
        }
      }
      
      // If more than 60% of the strip is light, it's likely a boundary
      if (lightPixelCount > totalChecked * 0.6) {
        boundaryCandidates.push(x);
      }
    }
    
    // Merge nearby candidates (within 20 pixels)
    const boundaries = [];
    let lastBoundary = -100;
    for (const candidate of boundaryCandidates) {
      if (candidate - lastBoundary > 20) {
        boundaries.push(candidate);
        lastBoundary = candidate;
      }
    }
    
    // Create garage segments
    const garages = [];
    // Add left edge if first boundary is far from start
    if (boundaries.length > 0 && boundaries[0] > 200) {
      garages.push({ index: 0, startX: 0, endX: boundaries[0] });
    }
    
    for (let i = 0; i < boundaries.length - 1; i++) {
      const startX = boundaries[i];
      const endX = boundaries[i + 1];
      const garageWidth = endX - startX;
      
      if (garageWidth > 150) { // Minimum garage width
        garages.push({
          index: garages.length,
          startX,
          endX,
          width: garageWidth
        });
      }
    }
    
    // Add right edge if last boundary is far from end
    if (boundaries.length > 0 && boundaries[boundaries.length - 1] < width - 200) {
      garages.push({
        index: garages.length,
        startX: boundaries[boundaries.length - 1],
        endX: width
      });
    }
    
    garageLayouts.push({
      rowIndex: rowIdx,
      startY,
      endY,
      garages
    });
    
    console.log(`  Found ${garages.length} garages`);
    garages.forEach((g, idx) => {
      console.log(`    Garage ${idx + 1}: x=${g.startX}-${g.endX} (width=${g.endX - g.startX})`);
    });
  }
  
  // Apply colors based on requirements
  console.log('\nApplying colors...');
  let pixelsModified = 0;
  
  for (let rowIdx = 0; rowIdx < garageLayouts.length; rowIdx++) {
    const layout = garageLayouts[rowIdx];
    const garages = layout.garages;
    
    if (garages.length === 0) {
      console.log(`  Skipping row ${rowIdx + 1} - no garages detected`);
      continue;
    }
    
    for (let y = layout.startY; y < layout.endY; y++) {
      for (let x = 0; x < width; x++) {
        // Find which garage this pixel belongs to
        let garageIndex = -1;
        for (let g = 0; g < garages.length; g++) {
          if (x >= garages[g].startX && x < garages[g].endX) {
            garageIndex = g;
            break;
          }
        }
        
        if (garageIndex === -1) continue;
        
        const index = (y * width + x) * channels;
        const r = pixels[index];
        const g = pixels[index + 1];
        const b = pixels[index + 2];
        const a = channels === 4 ? pixels[index + 3] : 255;
        
        // Only color car pixels
        if (isCarPixel(r, g, b, a)) {
          let targetColor = null;
          
          if (rowIdx === 0) {
            // First row (top most): 1st = blue, rest = red
            if (garageIndex === 0) {
              targetColor = colors.blue; // #0800ff
            } else {
              targetColor = colors.red; // #ff0116
            }
          } else if (rowIdx === 1) {
            // Second row: 1st, 6th, 11th, 13th = light blue; 2nd-5th, 7th-10th = yellow
            // Note: garageIndex is 0-based, so 1st = 0, 6th = 5, 11th = 10, 13th = 12
            if ([0, 5, 10, 12].includes(garageIndex)) {
              targetColor = colors.lightBlue; // #23ecff
            } else if ([1, 2, 3, 4, 6, 7, 8, 9].includes(garageIndex)) {
              targetColor = colors.yellow; // #fcc419
            }
          } else if (rowIdx === 2) {
            // Last row: 1st = red, rest = orange
            if (garageIndex === 0) {
              targetColor = colors.red; // #ff0116
            } else {
              targetColor = colors.orange; // #f08c00
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
    
    console.log(`  Row ${rowIdx + 1}: Modified pixels in ${garages.length} garages`);
  }
  
  console.log(`\nTotal pixels modified: ${pixelsModified}`);
  
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








