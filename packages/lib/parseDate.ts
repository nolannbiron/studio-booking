import type { Locale } from '@repo/prisma/enums'
import { en, fr } from 'chrono-node'

// import { getLocaleCookie } from './setLocaleCookie'

export const parseDate = (dateString: string, locale: Locale | null = 'en'): Date | undefined => {
	if (!dateString) return undefined

	let parsedDate: Date | undefined

	if (locale === 'fr') {
		parsedDate = fr.parseDate(dateString, new Date(), {
			forwardDate: true
		})
	}

	if (!parsedDate || locale === 'en') {
		parsedDate = en.parseDate(dateString, new Date(), {
			forwardDate: true
		})
	}

	if (!parsedDate && locale === 'en') {
		parsedDate = fr.parseDate(dateString, new Date(), {
			forwardDate: true
		})
	}

	return parsedDate
}
