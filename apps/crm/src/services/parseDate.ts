import { getLocaleCookie } from '@/setLocaleCookie'
import { en, fr } from 'chrono-node'

export const parseDate = (dateString: string): Date | undefined => {
	if (!dateString) return undefined

	const locale = getLocaleCookie()

	if (locale === 'fr') {
		const parsedDateFr = fr.casual.parseDate(dateString, new Date(), {
			forwardDate: false
		})

		if (parsedDateFr) return parsedDateFr
	}

	const parsedDate = en.casual.parseDate(dateString, new Date(), {
		forwardDate: false
	})
	if (!parsedDate) return undefined
	return parsedDate
}
