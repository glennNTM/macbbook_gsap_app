import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    // three.js est volumineux mais chargé à la demande, hors du bundle initial.
    chunkSizeWarningLimit: 1100,
    rolldownOptions: {
      output: {
        codeSplitting: {
          // GSAP isolé : chunk stable, mis en cache entre les déploiements.
          groups: [{ name: "gsap", test: /node_modules[\\/](gsap|@gsap)[\\/]/ }],
        },
      },
    },
  },
});
