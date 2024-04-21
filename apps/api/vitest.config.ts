/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		reporters: 'verbose',
		setupFiles: ['./src/__tests__/setup/setup-account.ts', './src/__tests__/setup/setup-team.ts'],
		singleThread: true,
		sequence: {
			setupFiles: 'list',
			hooks: 'list'
		}
	}
})
