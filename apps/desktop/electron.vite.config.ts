import svgr from '@svgr/rollup'
import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	main: {
		plugins: [externalizeDepsPlugin()],
		build: {
			rollupOptions: {
				input: {
					index: resolve(__dirname, 'electron/main/index.ts')
				}
			}
		}
	},
	preload: {
		plugins: [externalizeDepsPlugin()],
		build: {
			rollupOptions: {
				input: {
					index: resolve(__dirname, 'electron/preload/index.ts')
				}
			}
		}
	},
	renderer: {
		resolve: {
			alias: {
				'@renderer': resolve('src')
			}
		},
		root: '.',
		build: {
			rollupOptions: {
				input: {
					index: resolve(__dirname, 'index.html')
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
			'process.env': process.env
		}
	}
})
