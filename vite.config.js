import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/GitHub-Profile-Viewer",
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },
});