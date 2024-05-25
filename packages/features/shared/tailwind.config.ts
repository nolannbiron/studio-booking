import sharedConfig from '@repo/config/tailwind.config'
import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
	...sharedConfig,
	content: [...sharedConfig.content],
	theme: {
		extend: {
			...sharedConfig.theme.extend,
			fontFamily: {
				sans: ['var(--font-inter)', ...fontFamily.sans],
				cal: ['var(--font-cal)', ...fontFamily.sans]
			}
		}
	}
} satisfies Config
