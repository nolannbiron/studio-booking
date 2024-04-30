function generateRandomTagColors(): { backgroundColor: string; textColor: string } {
	const getRandomColorComponent = (): number => Math.floor(Math.random() * 256)

	const generateRandomColor = (): string => {
		const r = getRandomColorComponent()
		const g = getRandomColorComponent()
		const b = getRandomColorComponent()
		return `rgb(${r}, ${g}, ${b})`
	}

	const backgroundRgb = [29, 78, 59] // Example background color RGB values

	const getComplementaryTextColor = (rgb: number[]): string => {
		// Calculate the relative luminance of the background color
		const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255
		// Choose white or black text color based on luminance
		return luminance > 0.5 ? '#000000' : '#FFFFFF'
	}

	const backgroundColor = generateRandomColor()
	const textColor = getComplementaryTextColor(backgroundRgb)

	return { backgroundColor, textColor }
}

// Test the function
const { backgroundColor, textColor } = generateRandomTagColors()
console.log('Background Color:', backgroundColor)
console.log('Tag Text Color:', textColor)
