export const countries = {
	'en-US': { language: 'en', region: 'US', currency: 'USD' },
	'en-GB': { language: 'en', region: 'GB', currency: 'GBP' },
	fr: { language: 'fr', region: 'FR', currency: 'EUR' }
} as const
export type AvailableCountryCode = keyof typeof countries
export type AvailableRegion = (typeof countries)[AvailableCountryCode]['region']
export type AvailableLanguage = (typeof countries)[AvailableCountryCode]['language']
export type AvailableCurrency = (typeof countries)[AvailableCountryCode]['currency']

export const defaultCountryCode: AvailableCountryCode = 'fr'

export const availableCountryCodes = Object.keys(countries) as AvailableCountryCode[]
export const availableLanguages = Object.values(countries).map((country) => country.language)
export const availableRegions = Object.values(countries).map((country) => country.region)
export const availableCurrencies = Object.values(countries).map((country) => country.currency)
