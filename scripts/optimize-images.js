// scripts/optimize-images.js
//
// Usage: npm run optimize-images
//
// Drop any new team-member photo (jpg/png/jpeg/webp — any size, any weight)
// into `raw-images/`, run this script, and it will output a resized,
// compressed .webp version into `src/assets/images/` with the same
// filename (minus extension). The raw-images/ folder is git-ignored —
// it's just a scratch space, not something we commit.
//
// After running, import the new file in src/data/team.js like:
//   import newMemberProfile from "../assets/images/new-member.webp";

import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_DIR = path.join(__dirname, "..", "raw-images");
const OUT_DIR = path.join(__dirname, "..", "src", "assets", "images");

// Avatars only ever render up to ~128px on screen (w-32 in Team.jsx),
// but we export at 2x that for retina screens without going overboard.
const TARGET_SIZE = 400;
const WEBP_QUALITY = 80;

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

async function main() {
  await fs.mkdir(RAW_DIR, { recursive: true });
  await fs.mkdir(OUT_DIR, { recursive: true });

  const files = (await fs.readdir(RAW_DIR)).filter((f) =>
    SUPPORTED_EXTENSIONS.has(path.extname(f).toLowerCase())
  );

  if (files.length === 0) {
    console.log(`No images found in ${path.relative(process.cwd(), RAW_DIR)}/`);
    console.log("Drop a photo in there and re-run: npm run optimize-images");
    return;
  }

  console.log(`Found ${files.length} image(s) to optimize:\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const inputPath = path.join(RAW_DIR, file);
    const nameWithoutExt = path.parse(file).name;
    const outputPath = path.join(OUT_DIR, `${nameWithoutExt}.webp`);

    const beforeStats = await fs.stat(inputPath);

    await sharp(inputPath)
      .resize(TARGET_SIZE, TARGET_SIZE, {
        fit: "cover",       // crop to fill the square, like an avatar
        position: "attention", // let sharp pick the most interesting crop area (usually the face)
      })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath);

    const afterStats = await fs.stat(outputPath);
    totalBefore += beforeStats.size;
    totalAfter += afterStats.size;

    const beforeKB = (beforeStats.size / 1024).toFixed(0);
    const afterKB = (afterStats.size / 1024).toFixed(0);
    const savings = (100 - (afterStats.size / beforeStats.size) * 100).toFixed(0);

    console.log(
      `  ${file} → ${nameWithoutExt}.webp   ${beforeKB}KB → ${afterKB}KB  (-${savings}%)`
    );
  }

  const totalBeforeKB = (totalBefore / 1024).toFixed(0);
  const totalAfterKB = (totalAfter / 1024).toFixed(0);
  const totalSavings = (100 - (totalAfter / totalBefore) * 100).toFixed(0);

  console.log(`\nTotal: ${totalBeforeKB}KB → ${totalAfterKB}KB  (-${totalSavings}%)`);
  console.log(`\nOutput written to src/assets/images/. Now import the .webp file(s)`);
  console.log(`in src/data/team.js and delete the originals from raw-images/ if you like.`);
}

main().catch((err) => {
  console.error("Image optimization failed:", err);
  process.exit(1);
});