import sharp from 'sharp';
import { readdir, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const directories = [
  'public/images',
  'public/images/menu',
  'public/images/packages',
  'public/images/facilities',
  'public/images/facilities/cafe',
  'public/images/facilities/room',
  'public/images/facilities/outdoor',
  'public/images/facilities/indoor'
];

async function convertToWebp(inputPath) {
  const ext = extname(inputPath).toLowerCase();
  if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
    return;
  }

  const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  try {
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);

    console.log(`✓ Converted: ${basename(inputPath)} -> ${basename(outputPath)}`);

    // 원본 jpg 파일 삭제
    await unlink(inputPath);
    console.log(`  Deleted original: ${basename(inputPath)}`);
  } catch (error) {
    console.error(`✗ Failed to convert ${inputPath}:`, error.message);
  }
}

async function processDirectory(dirPath) {
  try {
    const files = await readdir(dirPath);
    for (const file of files) {
      const fullPath = join(dirPath, file);
      await convertToWebp(fullPath);
    }
  } catch (error) {
    console.log(`Directory ${dirPath} not found or empty`);
  }
}

async function main() {
  console.log('Converting images to WebP...\n');

  for (const dir of directories) {
    console.log(`\nProcessing: ${dir}`);
    await processDirectory(dir);
  }

  console.log('\nDone!');
}

main();
