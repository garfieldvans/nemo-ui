import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: ["**/*.stories.tsx", "**/*.test.tsx", "**/*.stories.ts", "**/*.test.ts", "tests/**"],
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
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        // Entry ini memakai hook, context, dan portal, jadi harus dievaluasi di
        // Client Component. Tanpa direktif ini Next.js App Router melempar error
        // saat `import { Button } from "@nemo-ui/ui"` dipakai di Server Component.
        banner: '"use client";',
      },
    },
  },

  test: {
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    globals: true,
  },
});
