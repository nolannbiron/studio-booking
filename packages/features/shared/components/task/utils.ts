import i18next from '@repo/i18n/next/client'
import type { TFunction } from '@repo/i18n/types'
import { isToday, isTomorrow, isYesterday } from 'date-fns'

export const formatTaskDueDate = (value: Date, t: TFunction): string | undefined => {
	const today = isToday(new Date(value))
	const yesterday = isYesterday(new Date(value))
	const tomorrow = isTomorrow(new Date(value))

	return today
		? t('time-ago.today')
		: yesterday
			? t('time-ago.yesterday')
			: tomorrow
				? t('time-ago.tomorrow')
				: new Date(value).toLocaleDateString(i18next.language, {
						year: 'numeric',
						month: 'short',
						day: 'numeric'
					})
}
