import sharedConfig from '@repo/config/tailwind.config'
import { type Config } from 'tailwindcss'

export default {
	...sharedConfig,
	content: [...sharedConfig.content, './src/index.tsx']
} satisfies Config
