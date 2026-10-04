// assets-src/images 配下の元画像を、配信用の軽量なWebPにして public/images に出力する。
//   使い方: npm run images
//   - 元画像は assets-src/images/<種類>/ に置く（assets-src は配信されない）
//   - 出力は public/images/<種類>/<名前>.webp（元画像と同名で上書き）
//   - 種類ごとの最大幅は MAX_WIDTH で決める（拡大はしない）
import { readdir, mkdir } from 'node:fs/promises';
import { join, extname, basename, relative } from 'node:path';
import sharp from 'sharp';

const SRC = 'assets-src/images';
const OUT = 'public/images';
const QUALITY = 80;
const DEFAULT_MAX_WIDTH = 1600;
const MAX_WIDTH = { videos: 800, instructors: 300 };

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

for await (const file of walk(SRC)) {
  if (!['.jpg', '.jpeg', '.png'].includes(extname(file).toLowerCase())) continue;
  const rel = relative(SRC, file);
  const kind = rel.split('/')[0];
  const outDir = join(OUT, relative(SRC, join(file, '..')));
  const outFile = join(outDir, `${basename(file, extname(file))}.webp`);
  await mkdir(outDir, { recursive: true });
  const info = await sharp(file)
    .rotate()
    .resize({ width: MAX_WIDTH[kind] ?? DEFAULT_MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outFile);
  console.log(`${rel} -> ${outFile} (${Math.round(info.size / 1024)}KB)`);
}
