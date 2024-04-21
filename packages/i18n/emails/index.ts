import i18n from 'i18next'

import i18nEnglish from '../messages/en.json'
import i18nFrench from '../messages/fr.json'

export const countries = {
	'fr-FR': { language: 'fr', region: 'FR', currency: 'EUR', translation: i18nFrench },
	'en-US': { language: 'en', region: 'US', currency: 'USD', translation: i18nEnglish }
} as const

const defaultCountryCode = 'en-US'

i18n
	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	// .use(LanguageDetector)
	.init({
		returnNull: false,
		returnEmptyString: false,
		resources: {
			en: { translation: i18nEnglish },
			fr: { translation: i18nFrench }
		},
		lng: countries[defaultCountryCode].language, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
		// you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
		// if you're using a language detector, do not define the lng option

		interpolation: {
			escapeValue: false // react already safes from xss
		}
	})

export default i18n
