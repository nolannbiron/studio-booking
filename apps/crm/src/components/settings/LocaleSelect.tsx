import { useTranslation } from '@repo/i18n/next/client'
import { supportedLocales } from '@repo/i18n/settings'
import { getFlagEmoji } from '@repo/lib/get-flag-emoji'
import type { Locale } from '@repo/prisma/enums'
import { Button } from '@repo/ui/button'
import { Combobox } from '@repo/ui/combobox'
import { useEffect, useState } from 'react'
import { HiSelector } from 'react-icons/hi'

export default function LocaleSelect({
	locale,
	onSelect
}: {
	locale?: Locale | null
	onSelect: (locale: Locale) => void
}) {
	const { t } = useTranslation()
	const [selectedLocale, setSelectedLocale] = useState(locale)

	useEffect(() => {
		setSelectedLocale(locale)
	}, [locale])

	const options = supportedLocales.map((locale) => ({
		icon: getFlagEmoji(locale === 'en' ? 'gb' : locale),
		label: t(`locale.${locale}`, {
			lng: locale
		}),
		value: locale
	}))

	const handleSelect = (value: string) => {
		setSelectedLocale(value as Locale)
		onSelect(value as Locale)
	}

	return (
		<div>
			<Combobox fullWidth options={options} onSelect={handleSelect} value={selectedLocale ?? undefined}>
				<Button type="button" variant="outline" className="w-full justify-between">
					{selectedLocale ? (
						<div className="flex items-center gap-2">
							<span>{getFlagEmoji(selectedLocale === 'en' ? 'gb' : selectedLocale)}</span>
							<span>
								{t(`locale.${selectedLocale}`, {
									lng: selectedLocale
								})}
							</span>
						</div>
					) : (
						t('account.form.select_locale')
					)}
					<HiSelector />
				</Button>
			</Combobox>
		</div>
	)
}
