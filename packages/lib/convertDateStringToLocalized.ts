import i18next from '@repo/i18n/next/client'
import { FALLBACK_LOCALE } from '@repo/i18n/settings'
import type { TPrivateUser } from '@repo/schemas/user'

export function convertDateStringToLocalized(dateStr: string, locale: TPrivateUser['locale']): string {
	const [month, year] = dateStr.split('-').map(Number)

	// Create a Date object (day set to 1 as we only need month and year)
	const date = new Date(year, month - 1)

	// Create a localized date string for month and year
	const formatter = new Intl.DateTimeFormat(locale ?? FALLBACK_LOCALE, { year: 'numeric', month: 'long' })

	const isThisMonth = new Date().getMonth() === month - 1

	// If the date is this month, we return a string that says "This month"
	return isThisMonth ? i18next.t('date.this_month') : formatter.format(date)
}
