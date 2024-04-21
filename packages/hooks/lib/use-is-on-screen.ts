import { type RefObject, useEffect, useRef, useState } from 'react'

export function useIsOnScreen(
	ref: RefObject<HTMLElement>,
	callback?: (() => void) | null,
	dependencies: React.DependencyList = []
) {
	const observerRef = useRef<IntersectionObserver | null>(null)
	const [isOnScreen, setIsOnScreen] = useState(false)

	useEffect(() => {
		observerRef.current = new IntersectionObserver(([entry]) => {
			setIsOnScreen(entry.isIntersecting)

			entry.isIntersecting && callback && callback()
		})
	}, [callback])

	useEffect(() => {
		if (!observerRef.current || !ref.current) return

		observerRef.current.observe(ref.current)

		return () => {
			if (observerRef.current) observerRef.current.disconnect()
		}
	}, [ref, dependencies])

	return isOnScreen
}
