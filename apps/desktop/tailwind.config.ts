import sharedConfig from '@repo/config/tailwind.config'
import type { Config } from 'tailwindcss'

export default {
	...sharedConfig,
	content: [...sharedConfig.content, './src/**/*.{js,jsx,ts,tsx}', './electron/**/*.{js,jsx,ts,tsx}']
} satisfies Config
