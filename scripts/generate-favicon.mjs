import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const sourceImage = 'F:/choho_2025/public/images/logo-main.webp';

async function generateFavicons() {
  console.log('Generating favicons with white background...');

  // 16x16 favicon
  await sharp(sourceImage)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('Created favicon-16x16.png');

  // 32x32 favicon
  await sharp(sourceImage)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('Created favicon-32x32.png');

  // 180x180 apple-touch-icon
  await sharp(sourceImage)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Created apple-touch-icon.png');

  // favicon.ico (32x32 as ico)
  await sharp(sourceImage)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));

  // Copy to src/app as well
  await sharp(sourceImage)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
    .png()
    .toFile(path.join(__dirname, '..', 'src', 'app', 'icon.png'));
  console.log('Created icon.png for src/app');

  console.log('Done! Favicons generated with white background.');
}

generateFavicons().catch(console.error);
