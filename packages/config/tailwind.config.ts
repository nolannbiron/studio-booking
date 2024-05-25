import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config = {
	darkMode: 'class',
	content: [
		'../../packages/features/**/*.{js,ts,jsx,tsx}',
		'../../packages/ui/**/*.{js,ts,jsx,tsx}',
		'../../packages/lib/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}'
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				xl: '1400px'
			}
		},
		extend: {
			screens: {
				lg: '1200px',
				xl: '1400px'
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				navbar: 'hsl(var(--navbar))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			variables: {
				DEFAULT: {
					background: '0 0% 100%',
					foreground: '220 7.89% 14.9%',
					navbar: '0 0% 98.43%',
					card: '0 0% 100%',
					'card-foreground': '220 7.89% 14.9%',
					popover: '0 0% 100%',
					'popover-foreground': '220 7.89% 14.9%',
					primary: '231 90% 64%',
					'primary-foreground': '220 9.68% 93.92%',
					secondary: ' 0 0% 96.1%',
					'secondary-foreground': '0 0% 9%',
					muted: ' 0 0% 96.1%',
					'muted-foreground': ' 0 0% 45.1%',
					accent: ' 0 0% 96.1%',
					'accent-foreground': '0 0% 9%',
					destructive: '0 84.2% 60.2%',
					'destructive-foreground': '220 9.68% 93.92%',
					border: ' 0 0% 89.8%',
					input: ' 0 0% 89.8%',
					ring: '231 90% 64%',
					radius: '0.6rem'
				}
			},
			darkVariables: {
				DEFAULT: {
					background: '220 10% 11.76%',
					navbar: '220 7.89% 14.9%',
					foreground: '220 9.68% 93.92%',
					card: '220 7.89% 14.9%',
					'card-foreground': '220 9.68% 93.92%',
					popover: '220 7.89% 14.9%',
					'popover-foreground': '220 9.68% 93.92%',
					primary: '231 90% 64%',
					'primary-foreground': '220 9.68% 93.92%',
					secondary: '220 5.77% 22.39%',
					'secondary-foreground': '220 9.68% 93.92%',
					muted: '220 5.77% 22.39%',
					'muted-foreground': '0 0% 63.9%',
					accent: '220 5.77% 22.39%',
					'accent-foreground': '220 9.68% 93.92%',
					destructive: '0 100% 61%',
					'destructive-foreground': '220 9.68% 93.92%',
					border: '220 5.77% 22.39%',
					input: '220 5.77% 22.39%',
					ring: '231 90% 64%'
				}
			}
		}
	},
	plugins: [
		require('tailwindcss-animate'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		require('tailwind-scrollbar')({ nocompatible: true }),
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		require('tailwindcss-radix')(),
		plugin(({ addVariant }) => {
			addVariant('mac', '.mac &')
			addVariant('windows', '.windows &')
			addVariant('ios', '.ios &')
		}),
		plugin(({ addBase, theme }) => {
			addBase({
				hr: {
					borderColor: theme('subtle')
				}
			})
		}),
		require('@mertasan/tailwindcss-variables')
	],
	variants: {
		scrollbar: ['rounded', 'dark']
	}
} satisfies Config

export default config
