export type TTagColorsPreset =
	| 'pastel_blue'
	| 'pastel_green'
	| 'pastel_yellow'
	| 'pastel_violet'
	| 'pastel_orange'
	| 'pastel_red'
	| 'pastel_light-green'
	| 'pastel_magenta'
	| 'pastel_teal'
	| 'pastel_grey'

export const tagsColors: TTagColorsPreset[] = [
	'pastel_blue',
	'pastel_green',
	'pastel_yellow',
	'pastel_violet',
	'pastel_orange',
	'pastel_red',
	'pastel_light-green',
	'pastel_magenta',
	'pastel_teal',
	'pastel_grey'
]

export const getRandomTagColor = (): TTagColorsPreset => {
	const randomIndex = Math.floor(Math.random() * tagsColors.length)
	return tagsColors[randomIndex]
}

export const getTagColorValues = (
	preset: TTagColorsPreset
): { boxShadow: string; backgroundColor: string; color: string } => {
	switch (preset) {
		case 'pastel_blue':
			return {
				boxShadow: 'rgb(49, 72, 114) 0px 0px 0px 1px inset',
				backgroundColor: 'rgb(41, 60, 96)',
				color: '#E5EEFF'
			}
		case 'pastel_green':
			return {
				boxShadow: 'rgb(36, 97, 73) 0px 0px 0px 1px inset',
				backgroundColor: 'rgb(29, 78, 59)',
				color: '#DDF9E4'
			}
		case 'pastel_yellow':
			return {
				boxShadow: 'rgb(106, 82, 6) 0px 0px 0px 1px inset',
				backgroundColor: 'rgb(87, 67, 5)',
				color: '#FFF3CC'
			}
		case 'pastel_violet':
			return {
				boxShadow: 'rgb(87, 61, 143) 0px 0px 0px 1px inset',
				backgroundColor: 'rgb(70, 49, 114)',
				color: '#F5F0FF'
			}
		case 'pastel_orange':
			return {
				boxShadow: 'rgb(106, 54, 12) 0px 0px 0px 1px inset',
				backgroundColor: 'rgb(85, 50, 22)',
				color: '#FEEEE1'
			}
		case 'pastel_red':
			return {
				boxShadow: 'rgb(103, 51, 50) 0px 0px 0px 1px inset',
				backgroundColor: 'rgb(85, 39, 38)',
				color: '#FFEBEB'
			}
		case 'pastel_light-green':
			return {
				boxShadow: 'rgb(80, 89, 33) 0px 0px 0px 1px inset',
				backgroundColor: 'rgb(66, 74, 28)',
				color: '#F4FBCB'
			}
		case 'pastel_magenta':
			return {
				boxShadow: 'rgb(104, 39, 93) 0px 0px 0px 1px inset',
				backgroundColor: 'rgb(86, 37, 78)',
				color: '#FEECF1'
			}
		case 'pastel_teal':
			return {
				boxShadow: 'rgb(22, 83, 100) 0px 0px 0px 1px inset',
				backgroundColor: 'rgb(19, 73, 88)',
				color: '#DAF4FC'
			}
		case 'pastel_grey':
			return {
				boxShadow: 'rgb(69, 71, 74) 0px 0px 0px 1px inset',
				backgroundColor: 'rgb(49, 51, 55)',
				color: '#E6E7EA'
			}
	}
}
