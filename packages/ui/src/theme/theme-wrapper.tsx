import { useCallback, useEffect } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ColorMode = 'light' | 'dark' | 'system'
export type Theme = 'light' | 'dark'

export const useTheme = create<{
	colorMode: ColorMode
	setColorMode: (colorMode: ColorMode) => void
	resolvedTheme?: Theme
	setResolvedTheme: (resolvedTheme: Theme) => void
}>()(
	persist(
		(set) => ({
			colorMode: 'system',
			setColorMode: (colorMode) => set({ colorMode }),
			setResolvedTheme: (resolvedTheme) => set({ resolvedTheme }),
			resolvedTheme: undefined
		}),
		{
			name: 'color-mode-storage'
		}
	)
)

interface Props {
	children: React.ReactNode
}

export const ThemeProvider = ({ children }: Props) => {
	const { colorMode, setColorMode, setResolvedTheme } = useTheme()

	if (colorMode === 'system') {
		const event = window.matchMedia('(prefers-color-scheme: dark)')

		event.addEventListener('change', (match) => {
			if (match.matches && colorMode !== 'system') {
				setColorMode('dark')
			} else if (!match.matches && colorMode !== 'system') {
				setColorMode('light')
			} else if (colorMode === 'system') {
				setColorMode('system')
			}
		})
	}

	const getTheme = useCallback(() => {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	}, [])

	const themeActive = colorMode === 'system' ? getTheme() : colorMode

	document.getElementsByTagName('html')[0].setAttribute('class', themeActive.toString())

	useEffect(() => {
		setResolvedTheme(getTheme())
	}, [getTheme, setResolvedTheme])

	return children
}
