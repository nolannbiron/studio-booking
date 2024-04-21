import { useEffect, useMemo, useState } from 'react'
import { screens } from 'tailwindcss/defaultTheme'

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

function throttle(func: (...args: unknown[]) => void, timeFrame: number) {
	let lastTime = 0
	return function (...args: unknown[]) {
		const now = new Date().getTime()
		if (now - lastTime >= timeFrame) {
			func(...args)
			lastTime = now
		}
	}
}

const findKeyByValue = (object: typeof screens, value: string) =>
	Object.keys(object).find((key) => object[key as keyof typeof object] === value)

const getDeviceConfig = (width: number): Breakpoint => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	/* @ts-ignore */
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const bpSizes = Object.keys(screens).map((screenSize) => parseInt(screens[screenSize]))

	const bpShapes = bpSizes.map((size, index) => ({
		min: !index ? 0 : bpSizes[index - 1],
		max: size,
		key: findKeyByValue(screens, `${size}px`)
	}))

	let breakpoint: Breakpoint | null = 'md'

	bpShapes.forEach((shape) => {
		if (!shape.min && width < shape.max) {
			breakpoint = shape.key as Breakpoint
		} else if (shape.min && width >= shape.min && width < shape.max) {
			breakpoint = shape.key as Breakpoint
		} else if (!shape.max && width >= shape.max) {
			breakpoint = shape.key as Breakpoint
		}
	})

	return breakpoint
}

export const useTailwindBreakpoint = () => {
	const [dimensions, setDimensions] = useState({
		width: typeof window !== 'undefined' ? window.innerWidth : 0,
		height: typeof window !== 'undefined' ? window.innerHeight : 0
	})

	const handleResize = throttle(function () {
		setDimensions({
			width: typeof window !== 'undefined' ? window.innerWidth : 0,
			height: typeof window !== 'undefined' ? window.innerHeight : 0
		})
	}, 200)

	useEffect(() => {
		window.addEventListener('resize', handleResize, false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return useMemo(() => getDeviceConfig(dimensions.width), [dimensions.width])
}
