import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],

  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "NemoUI",
      fileName: "index",
      formats: ["es"],
    },

    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
});