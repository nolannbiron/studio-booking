import { hexToHSL } from '@repo/lib/hexToHSL'

export function getRandomAvatarColor(): string {
	// Define an array of bright colors
	const brightColors = [
		'#e53935',
		'#d81b60',
		'#8e24aa',
		'#5e35b1',
		'#3949ab',
		'#1e88e5',
		'#039be5',
		'#00acc1',
		'#00897b',
		'#43a047',
		'#7cb342',
		'#c0ca33',
		'#fdd835',
		'#ffb300',
		'#fb8c00',
		'#f4511e'
	]

	// Get a random index
	const index = Math.floor(Math.random() * brightColors.length)

	return hexToHSL(brightColors[index])
}
