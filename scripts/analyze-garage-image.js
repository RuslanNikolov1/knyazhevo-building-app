import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function analyzeImage() {
  const inputPath = join(__dirname, '../public/+0.00-1.png');
  
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const { width, height } = metadata;
  
  console.log(`Image dimensions: ${width}x${height}`);
  
  // Get raw pixel data
  const { data, info } = await image
    .raw()
    .toBuffer({ resolveWithObject: true });
  
  const pixels = new Uint8Array(data);
  const channels = info.channels;
  
  // Sample some pixels to understand the structure
  // Check middle horizontal line to find garage boundaries
  const midY = Math.floor(height / 2);
  const sampleLine = [];
  
  for (let x = 0; x < width; x += 10) {
    const index = (midY * width + x) * channels;
    const r = pixels[index];
    const g = pixels[index + 1];
    const b = pixels[index + 2];
    sampleLine.push({ x, r, g, b, brightness: (r + g + b) / 3 });
  }
  
  // Find vertical boundaries (likely white/light lines between garages)
  const boundaries = [];
  for (let i = 1; i < sampleLine.length; i++) {
    const prev = sampleLine[i - 1];
    const curr = sampleLine[i];
    // Detect significant brightness changes (likely boundaries)
    if (Math.abs(curr.brightness - prev.brightness) > 50) {
      boundaries.push(curr.x);
    }
  }
  
  console.log('Detected potential boundaries:', boundaries.slice(0, 20));
  
  // Check top, middle, and bottom sections to identify rows
  const rowSections = [
    { name: 'Top', y: Math.floor(height * 0.15) },
    { name: 'Middle', y: Math.floor(height * 0.5) },
    { name: 'Bottom', y: Math.floor(height * 0.85) }
  ];
  
  for (const section of rowSections) {
    const carPixels = [];
    for (let x = 0; x < width; x++) {
      const index = (section.y * width + x) * channels;
      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];
      const brightness = (r + g + b) / 3;
      
      // Cars are typically darker (black/dark gray)
      if (brightness < 100) {
        carPixels.push(x);
      }
    }
    console.log(`${section.name} section (y=${section.y}): Found ${carPixels.length} potential car pixels`);
  }
}

analyzeImage().catch(console.error);




