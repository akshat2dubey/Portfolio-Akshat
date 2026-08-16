import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2020",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Keep the three.js stack out of the main bundle — the hero canvas is
          // lazy-loaded so the page paints without waiting on WebGL.
          if (id.includes("three") || id.includes("@react-three")) {
            return "three";
          }
          if (id.includes("framer-motion")) {
            return "motion";
          }
        },
      },
    },
  },
});
