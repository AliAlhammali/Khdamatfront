import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";
import ViteFonts from "unplugin-fonts/vite";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ template: { transformAssetUrls: { video: ["src", "poster"] } } }),
    VueDevTools(),
    ViteFonts({
      google: {
        families: [
          {
            name: "Cairo",
            styles: "wght@400;700",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      // "@": fileURLToPath(new URL("./src", import.meta.url))
      // "@": path.resolve(__dirname, "src/components"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/scss/styles.scss";`,
      },
    },
  },
  define: { "process.env": {} },

  base: "/",
  build: {
    target: "esnext", //browsers can handle the latest ES features
    cssMinify: true,
    sourcemap: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    // set font
    include: ["leaflet", "leaflet/dist/leaflet.css", "leaflet-geosearch"],
  },
});
