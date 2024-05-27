import svgr from '@svgr/rollup'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr({ memo: true }), tsconfigPaths()],
	server: {
		port: 3002
	},
	envPrefix: 'VITE_PUBLIC_',
	define: {
		'process.env': process.env
	}
})
