import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";
import path from "node:path";

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
      sourcemap: mode === "development",
      terserOptions: {
        compress: {
          drop_console: mode === "production" || mode === "staging",
          drop_debugger: mode === "production" || mode === "staging",
        },
      },
    },
  };
});
