import ContactGenreCombobox from '@/components/contacts/generics/ContactGenreCombobox'
import { useTranslation } from '@repo/i18n/next/client'
import type { ContactGenre } from '@repo/prisma/enums'
import { Button } from '@repo/ui/button'
import { useState } from 'react'
import { HiSelector } from 'react-icons/hi'

export default function ContactGenreselect({
	genre,
	onSelect
}: {
	genre?: ContactGenre | null
	onSelect: (genre: ContactGenre) => void
}) {
	const { t } = useTranslation()
	const [selectedGenre, setSelectedGenre] = useState(genre)

	const handleSelect = (value: string) => {
		setSelectedGenre(value as ContactGenre)
		onSelect(value as ContactGenre)
	}

	return (
		<ContactGenreCombobox fullWidth onSelect={handleSelect} value={selectedGenre ?? undefined}>
			<Button size="md" type="button" variant="outline" className="w-full justify-between">
				{selectedGenre ? (
					<div className="flex items-center gap-2">
						<span>{t(`contact.genre.${selectedGenre}`)}</span>
					</div>
				) : (
					<span className="text-muted-foreground/50">{t('contact.genre.select_genre')}</span>
				)}
				<HiSelector />
			</Button>
		</ContactGenreCombobox>
	)
}
