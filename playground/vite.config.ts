import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// GitHub Pages 部署时通过环境变量设置 base，例如 /repo-name/
const base = process.env.VITE_BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [vue()],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    preserveSymlinks: false,
  },
});
