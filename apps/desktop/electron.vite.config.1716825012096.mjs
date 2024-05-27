// electron.vite.config.ts
import svgr from "@svgr/rollup";
import react from "@vitejs/plugin-react";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";
var __electron_vite_injected_dirname = "/Users/nolannbiron/Documents/PROJETS/studio-booking/apps/desktop";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__electron_vite_injected_dirname, "electron/main/index.ts")
        }
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__electron_vite_injected_dirname, "electron/preload/index.ts")
        }
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src")
      }
    },
    root: "src",
    build: {
      rollupOptions: {
        input: {
          index: resolve(__electron_vite_injected_dirname, "index.html")
        }
      }
    },
    plugins: [react(), svgr({ memo: true }), tsconfigPaths()],
    server: {
      fs: {
        cachedChecks: false
      }
    },
    define: {
      "process.env": process.env
    }
  }
});
export {
  electron_vite_config_default as default
};
