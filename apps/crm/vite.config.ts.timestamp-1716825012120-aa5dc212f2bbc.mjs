// vite.config.ts
import svgr from "file:///Users/nolannbiron/Documents/PROJETS/studio-booking/node_modules/@svgr/rollup/dist/index.js";
import react from "file:///Users/nolannbiron/Documents/PROJETS/studio-booking/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { defineConfig } from "file:///Users/nolannbiron/Documents/PROJETS/studio-booking/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///Users/nolannbiron/Documents/PROJETS/studio-booking/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react(), svgr({ memo: true }), tsconfigPaths()],
  server: {
    port: 3002
  },
  envPrefix: "VITE_PUBLIC_",
  define: {
    "process.env": process.env
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbm9sYW5uYmlyb24vRG9jdW1lbnRzL1BST0pFVFMvc3R1ZGlvLWJvb2tpbmcvYXBwcy9jcm1cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9ub2xhbm5iaXJvbi9Eb2N1bWVudHMvUFJPSkVUUy9zdHVkaW8tYm9va2luZy9hcHBzL2NybS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbm9sYW5uYmlyb24vRG9jdW1lbnRzL1BST0pFVFMvc3R1ZGlvLWJvb2tpbmcvYXBwcy9jcm0vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgc3ZnciBmcm9tICdAc3Znci9yb2xsdXAnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuXHRwbHVnaW5zOiBbcmVhY3QoKSwgc3Zncih7IG1lbW86IHRydWUgfSksIHRzY29uZmlnUGF0aHMoKV0sXG5cdHNlcnZlcjoge1xuXHRcdHBvcnQ6IDMwMDJcblx0fSxcblx0ZW52UHJlZml4OiAnVklURV9QVUJMSUNfJyxcblx0ZGVmaW5lOiB7XG5cdFx0J3Byb2Nlc3MuZW52JzogcHJvY2Vzcy5lbnZcblx0fVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1csT0FBTyxVQUFVO0FBQ3ZYLE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLG1CQUFtQjtBQUcxQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBRSxNQUFNLEtBQUssQ0FBQyxHQUFHLGNBQWMsQ0FBQztBQUFBLEVBQ3hELFFBQVE7QUFBQSxJQUNQLE1BQU07QUFBQSxFQUNQO0FBQUEsRUFDQSxXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsSUFDUCxlQUFlLFFBQVE7QUFBQSxFQUN4QjtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
