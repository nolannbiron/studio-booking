import { useEffect } from 'react'

export function useKeyPress(targetKey: string, callback?: () => void, deps: any[] = []) {
	// If pressed key is our target key then set to true
	const downHandler = ({ key }: { key: string }) => {
		if (key === targetKey) {
			callback && callback()
		}
	}

	// If released key is our target key then set to false
	// const upHandler = ({ key }: { key: string }) => {
	// 	if (key === targetKey) {
	// 		setKeyPressed(false)
	// 	}
	// }

	// Add event listeners
	useEffect(() => {
		window.addEventListener('keydown', downHandler)
		// window.addEventListener('keyup', upHandler)
		// Remove event listeners on cleanup
		return () => {
			window.removeEventListener('keydown', downHandler)
			// window.removeEventListener('keyup', upHandler)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...deps]) // Empty array ensures that effect is only run on mount and unmount
}
