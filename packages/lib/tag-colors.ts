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
	| 'pastel_purple'
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
	'pastel_purple',
	'pastel_grey'
]

export const getRandomTagColor = (): TTagColorsPreset => {
	const randomIndex = Math.floor(Math.random() * tagsColors.length)
	return tagsColors[randomIndex]
}

const tagsDarkColors: {
	[key in TTagColorsPreset]: { boxShadow: string; backgroundColor: string; color: string }
} = {
	pastel_blue: {
		boxShadow: 'rgb(49, 72, 114) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(41, 60, 96)',
		color: '#E5EEFF'
	},
	pastel_green: {
		boxShadow: 'rgb(36, 97, 73) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(29, 78, 59)',
		color: '#DDF9E4'
	},
	'pastel_light-green': {
		boxShadow: 'rgb(80, 89, 33) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(66, 74, 28)',
		color: '#F4FBCB'
	},
	pastel_yellow: {
		boxShadow: 'rgb(106, 82, 6) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(87, 67, 5)',
		color: '#FFF3CC'
	},
	pastel_violet: {
		boxShadow: 'rgb(87, 61, 143) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(70, 49, 114)',
		color: '#F5F0FF'
	},
	pastel_orange: {
		boxShadow: 'rgb(106, 54, 12) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(85, 50, 22)',
		color: '#FEEEE1'
	},
	pastel_red: {
		boxShadow: 'rgb(103, 51, 50) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(85, 39, 38)',
		color: '#FFEBEB'
	},
	pastel_magenta: {
		boxShadow: 'rgb(104, 39, 93) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(86, 37, 78)',
		color: '#FEECF1'
	},
	pastel_teal: {
		boxShadow: 'rgb(22, 83, 100) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(19, 73, 88)',
		color: '#DAF4FC'
	},
	pastel_purple: {
		boxShadow: 'rgb(87, 61, 143) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(70, 49, 114)',
		color: '#F5F0FF'
	},
	pastel_grey: {
		boxShadow: 'rgb(69, 71, 74) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(49, 51, 55)',
		color: '#E6E7EA'
	}
}

const tagsLightColors: {
	[key in TTagColorsPreset]: { boxShadow: string; backgroundColor: string; color: string }
} = {
	pastel_blue: {
		boxShadow: 'rgb(214, 229, 255) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(229, 238, 255)',
		color: '#183C81'
	},
	pastel_green: {
		boxShadow: 'rgb(199, 244, 211) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(221, 249, 228)',
		color: '#075A39'
	},
	'pastel_light-green': {
		boxShadow: 'rgb(233, 247, 151) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(244, 251, 203)',
		color: '#505F07'
	},
	pastel_yellow: {
		boxShadow: 'rgb(255, 235, 173) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(255, 243, 204)',
		color: '#705500'
	},
	pastel_violet: {
		boxShadow: 'rgb(242, 214, 245) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(247, 230, 249)',
		color: '#681B74'
	},
	pastel_orange: {
		boxShadow: 'rgb(254, 224, 200) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(254, 238, 225)',
		color: '#75350'
	},
	pastel_red: {
		boxShadow: 'rgb(255, 220, 219) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(255, 235, 235)',
		color: '#772322'
	},
	pastel_magenta: {
		boxShadow: 'rgb(253, 221, 231) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(254, 236, 241)',
		color: '#6F065D'
	},
	pastel_teal: {
		boxShadow: 'rgb(195, 237, 249) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(218, 244, 252)',
		color: '#0A5A70'
	},
	pastel_purple: {
		boxShadow: 'rgb(232, 221, 254) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(245, 240, 255)',
		color: '#4711BB'
	},
	pastel_grey: {
		boxShadow: 'rgb(238, 239, 241) 0px 0px 0px 1px inset',
		backgroundColor: 'rgb(244, 245, 246)',
		color: '#5C5E63'
	}
}

export const getTagColorValues = (
	preset: TTagColorsPreset,
	colorMode: 'dark' | 'light' = 'dark'
): { boxShadow: string; backgroundColor: string; color: string } => {
	if (colorMode === 'dark') return tagsDarkColors[preset]

	return tagsLightColors[preset]
}
