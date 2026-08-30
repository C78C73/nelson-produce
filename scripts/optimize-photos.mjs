// Turns raw photos into the web-ready .webp files in src/photos/.
//
// Usage:
//   1. Put originals in  _source-photos/incoming/  (any jpg/jpeg/png/heic)
//   2. npm run photos
//   3. Check src/photos/, then add filenames to src/data/photos.mjs
//
// Never upscales. Applies a gentle, consistent grade so mixed-quality
// phone/Facebook/Google photos look like they belong together.

import sharp from 'sharp';
import { mkdirSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname, basename } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const inDir = join(root, '_source-photos', 'incoming');
const outDir = join(root, 'src', 'photos');
mkdirSync(outDir, { recursive: true });

if (!existsSync(inDir)) {
  console.log(`Nothing to do — create ${inDir} and drop originals in it.`);
  process.exit(0);
}

const files = readdirSync(inDir).filter((f) => /\.(jpe?g|png|heic|webp)$/i.test(f));
if (!files.length) {
  console.log(`No images found in ${inDir}.`);
  process.exit(0);
}

for (const f of files) {
  const src = join(inDir, f);
  const name = basename(f, extname(f)).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const out = join(outDir, `${name}.webp`);
  const meta = await sharp(src).metadata();
  const landscape = (meta.width ?? 0) >= (meta.height ?? 0);
  const cap = landscape ? 1600 : 1100; // plenty for this design; real photos can be larger

  const info = await sharp(src)
    .rotate() // respect EXIF orientation
    .resize({ width: Math.min(cap, meta.width ?? cap), withoutEnlargement: true })
    .modulate({ brightness: 1.02, saturation: 0.98 })
    .linear(1.03, -3)
    .sharpen({ sigma: 0.6 })
    .webp({ quality: 72, effort: 5 })
    .toFile(out);

  console.log(`${f}  ->  src/photos/${name}.webp  (${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB)`);
}
