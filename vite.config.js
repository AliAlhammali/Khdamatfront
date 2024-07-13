import vue from "@vitejs/plugin-vue";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import VueDevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue({ template: { transformAssetUrls: { video: ["src", "poster"] } } }),
      VueDevTools(),
    ],
    resolve: {
      alias: {
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
    define: {
      "process.env": {
        ...env,
      },
    },
    base: "/",
    build: {
      target: "esnext",
      cssMinify: true,
      sourcemap: false,
      terserOptions: {
        compress: {
          drop_console: mode === "production" || mode === "development",
          drop_debugger: mode === "production" || mode === "development",
        },
      },
    },
    optimizeDeps: {
      include: ["vue-google-maps-community-fork", "fast-deep-equal"],
    },
  };
});
