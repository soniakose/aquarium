import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  resolve: {
    alias: {
      src: "/src",
    },
  },
  plugins: [dts({ include: "src", rollupTypes: true })],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/components/index.ts"),
      name: "aquarium",
      formats: ["es"],
      fileName: "aquarium",
    },
    minify: false,
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "antd"],
      output: {
        globals: {
          antd: "antd",
          react: "React",
        },
      },
    },
  },
});
