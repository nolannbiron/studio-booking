import type { RefObject } from 'react'
import type React from 'react'
import { useEffect } from 'react'

export function useIsOutsideClick(
	ref: RefObject<HTMLDivElement>,
	callback: (event: MouseEvent) => void,
	dependencies: React.DependencyList = []
) {
	useEffect(() => {
		if (!callback) return

		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback(event)
			}
		}

		document.addEventListener('pointerdown', handleClickOutside)
		return () => {
			document.removeEventListener('pointerdown', handleClickOutside)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dependencies])
}
