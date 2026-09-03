import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: [
        "**/*.stories.tsx",
        "**/*.test.tsx",
        "**/*.stories.ts",
        "**/*.test.ts",
      ],
    }),
  ],

  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      name: "NemoUI",
      fileName: "index",
      formats: ["es"],
    },
    cssCodeSplit: false,

    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
      ],
    },
  },

  test: {
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    globals: true,
  },
});