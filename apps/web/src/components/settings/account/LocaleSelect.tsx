import { useTranslation } from '@repo/i18n/next/client'
import { supportedLocales } from '@repo/i18n/settings'
import { getFlagEmoji } from '@repo/lib/get-flag-emoji'
import type { Locale } from '@repo/prisma/enums'
import { Button } from '@repo/ui/button'
import { Combobox } from '@repo/ui/combobox'
import { useState } from 'react'
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

	const options = supportedLocales.map((locale) => ({
		label: (
			<div className="flex items-center gap-2">
				<span>{getFlagEmoji(locale === 'en' ? 'gb' : locale)}</span>
				<span>
					{t(`locale.${locale}`, {
						lng: locale
					})}
				</span>
			</div>
		),
		value: locale
	}))

	const handleSelect = (value: string) => {
		setSelectedLocale(value as Locale)
		onSelect(value as Locale)
	}

	return (
		<div>
			<Combobox options={options} onSelect={handleSelect} value={selectedLocale ?? undefined}>
				<Button type="button" variant="outline" size="sm" className="w-full justify-between">
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
