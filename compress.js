const sharp = require('sharp');
const fs = require('fs');

const inputPath = 'public/operator.jpg';
const tempPath = 'public/operator_compressed.jpg';

async function compressImage() {
  try {
    // Attempt progressive compression until under 40KB
    for (let quality = 80; quality >= 10; quality -= 10) {
      await sharp(inputPath)
        .resize(300) // resize down, since 500KB usually means large resolution
        .jpeg({ quality })
        .toFile(tempPath);
      
      const stats = fs.statSync(tempPath);
      if (stats.size <= 40960) {
        console.log(`Compressed to ${stats.size} bytes at quality ${quality}`);
        fs.renameSync(tempPath, inputPath);
        return;
      }
    }
    console.log("Could not compress under 40KB even at lowest settings.");
  } catch (err) {
    console.error("Compression failed:", err);
  }
}

compressImage();
