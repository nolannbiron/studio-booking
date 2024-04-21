// import the original type declarations
import 'i18next'

// import all namespaces (for the default language, only)

declare module 'i18next' {
	// Extend CustomTypeOptions
	interface CustomTypeOptions {
		// custom namespace type, if you changed it
		defaultNS: 'fr'
		// custom resources type
		resources: {
			fr: typeof import('@repo/i18n/messages/fr.json')
			en: typeof import('@repo/i18n/messages/en.json')
		}
		// other
	}
}
