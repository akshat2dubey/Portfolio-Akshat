/**
 * Generates production image assets from the source photographs.
 *
 *   npm run assets
 *
 * Reads  scripts/profile-original.jpeg  (primary portrait) and
 * writes:
 *   src/assets/profile.jpg       — optimized portrait for the Hero/About sections
 *   public/og-image.png          — 1200x630 social preview
 *   public/favicon-32.png        — raster favicon fallback
 *
 * If a higher-quality portrait is provided later, just replace
 * scripts/profile-original.jpeg and re-run.
 */
import sharp from "sharp";
import { mkdir, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SRC = path.join(root, "scripts", "profile-original.jpeg");
const OUT_PROFILE = path.join(root, "src", "assets", "profile.jpg");
const OUT_OG = path.join(root, "public", "og-image.png");
const OUT_FAVICON = path.join(root, "public", "favicon-32.png");

try {
  await access(SRC);
} catch {
  console.error(`✗ Source photo not found: ${SRC}`);
  console.error("  Put your portrait at scripts/profile-original.jpeg and re-run.");
  process.exit(1);
}

// --- Optimized profile portrait (squared crop for the circular frame) ---
await mkdir(path.dirname(OUT_PROFILE), { recursive: true });
await sharp(SRC)
  .resize(640, 640, { fit: "cover", position: "centre" })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(OUT_PROFILE);
console.log("✓ profile.jpg  (640x640)");

// --- OG image: dark gradient + brand lockup ---
const og = await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 4,
    background: { r: 4, g: 8, b: 18, alpha: 1 },
  },
})
  .composite([
    // radial cyan glow, top-left
    {
      input: await sharp({
        create: {
          width: 1200,
          height: 630,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
      })
        .composite([
          {
            input: Buffer.from(
              `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="g" cx="18%" cy="12%" r="65%">
                    <stop offset="0%" stop-color="#164e63" stop-opacity="0.55"/>
                    <stop offset="55%" stop-color="#0e2a3f" stop-opacity="0.18"/>
                    <stop offset="100%" stop-color="#04060c" stop-opacity="0"/>
                  </radialGradient>
                </defs>
                <rect width="1200" height="630" fill="url(#g)"/>
              </svg>`
            ),
          },
        ])                .png()
        .toBuffer(),
      top: 0,
      left: 0,
    },
    // grid lines
    {
      input: Buffer.from(
        `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#1e293b" stroke-opacity="0.35" stroke-width="1">
            <line x1="0" y1="0" x2="0" y2="630"/><line x1="120" y1="0" x2="120" y2="630"/>
            <line x1="240" y1="0" x2="240" y2="630"/><line x1="360" y1="0" x2="360" y2="630"/>
            <line x1="480" y1="0" x2="480" y2="630"/><line x1="600" y1="0" x2="600" y2="630"/>
            <line x1="720" y1="0" x2="720" y2="630"/><line x1="840" y1="0" x2="840" y2="630"/>
            <line x1="960" y1="0" x2="960" y2="630"/><line x1="1080" y1="0" x2="1080" y2="630"/>
            <line x1="0" y1="0" x2="1200" y2="0"/><line x1="0" y1="126" x2="1200" y2="126"/>
            <line x1="0" y1="252" x2="1200" y2="252"/><line x1="0" y1="378" x2="1200" y2="378"/>
            <line x1="0" y1="504" x2="1200" y2="504"/>
          </g>
        </svg>`
      ),
    },
    // text lockup
    {
      input: Buffer.from(
        `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="t" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#67e8f9"/>
              <stop offset="100%" stop-color="#818cf8"/>
            </linearGradient>
          </defs>
          <text x="80" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="76" font-weight="700" fill="url(#t)">Akshat Dubey</text>
          <text x="80" y="372" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="#cbd5e1">Cybersecurity Enthusiast · CSE Student · Security Builder</text>
          <text x="80" y="446" font-family="Consolas, monospace" font-size="24" fill="#38bdf8">Building secure systems — SecureBank Enterprise Lab</text>
          <rect x="80" y="496" width="220" height="6" rx="3" fill="#22d3ee"/>
        </svg>`
      ),
    },
  ])
  .png()
  .toFile(OUT_OG);
console.log("✓ og-image.png  (1200x630)");

// --- Raster favicon fallback (shield mark) ---
await sharp({
  create: {
    width: 32,
    height: 32,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([
    {
      input: Buffer.from(
        `<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2 L28 7 V15 C28 23 23 28 16 30 C9 28 4 23 4 15 V7 Z" fill="none" stroke="#22d3ee" stroke-width="2.4"/>
          <path d="M11 16 l3.5 3.5 L21 12" fill="none" stroke="#67e8f9" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
      ),
    },
  ])
  .png()
  .toFile(OUT_FAVICON);
console.log("✓ favicon-32.png");

console.log("Done.");
