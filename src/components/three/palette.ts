import * as THREE from "three";

/**
 * Shared palette for every 3D scene — mirrors the site's Tailwind theme
 * (deep navy/black base, electric cyan / blue / violet accents) so the
 * WebGL visuals read as part of the same design system.
 */
export const SCENE_COLORS = {
  night: new THREE.Color("#04060c"),
  cyan: new THREE.Color("#22d3ee"),
  cyanSoft: new THREE.Color("#67e8f9"),
  blue: new THREE.Color("#60a5fa"),
  violet: new THREE.Color("#a78bfa"),
  /** Node/edge tint family — cyan-leaning hues, same family as the theme. */
  nodeHues: [
    { h: 0.5, s: 0.95, l: 0.62 },
    { h: 0.52, s: 0.9, l: 0.66 },
    { h: 0.6, s: 0.85, l: 0.64 },
    { h: 0.68, s: 0.8, l: 0.7 },
  ],
} as const;

/**
 * Soft radial sprite used for glowing particles / nodes. Pure white core
 * so the sprite can be tinted via material color.
 */
export function makeGlowTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(200,240,255,0.85)");
  g.addColorStop(1, "rgba(34,211,238,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/** Dim, edge-colored tint for the faint 3D grid floor. */
export const GRID_COLOR = new THREE.Color(0x3a4a63);
