import i18next from '@repo/i18n/next/client'

export function timeAgo(date: Date): string {
	const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)

	let interval = seconds / 31536000

	if (interval > 1) {
		return i18next.t('time-ago.years', {
			time: Math.floor(interval)
		})
	}

	interval = seconds / 2592000

	if (interval > 1) {
		return i18next.t('time-ago.months', {
			time: Math.floor(interval)
		})
	}

	interval = seconds / 86400

	if (interval > 1) {
		return i18next.t('time-ago.days', {
			time: Math.floor(interval)
		})
	}

	interval = seconds / 3600

	if (interval > 1) {
		return i18next.t('time-ago.hours', {
			time: Math.floor(interval)
		})
	}

	interval = seconds / 60

	if (interval > 1) {
		return i18next.t('time-ago.minutes', {
			time: Math.floor(interval)
		})
	}

	return i18next.t('time-ago.seconds', {
		time: Math.floor(interval)
	})
}
