import { useTranslation } from '@repo/i18n/next/client'
import type { ContactGenre } from '@repo/prisma/enums'
import { Combobox } from '@repo/ui/combobox'
import type { PropsWithChildren } from 'react'
import { useState } from 'react'

const contactGenres: ContactGenre[] = [
	'BLUES',
	'CLASSICAL',
	'COUNTRY',
	'DANCE',
	'ELECTRONIC',
	'HIP_HOP',
	'JAZZ',
	'POP',
	'RAP',
	'REGGAE',
	'ROCK',
	'SOUL',
	'OTHERS'
]

export default function ContactGenreCombobox({
	value,
	onSelect,
	children,
	fullWidth
}: PropsWithChildren<{
	value?: ContactGenre | null
	onSelect: (genre: ContactGenre) => void
	fullWidth?: boolean
}>) {
	const { t } = useTranslation()
	const [selectedGenre, setSelectedGenre] = useState(value)

	const options = contactGenres.map((genre) => ({
		label: t(`contact.genre.${genre}`),
		value: genre
	}))

	const handleSelect = (value: string) => {
		setSelectedGenre(value as ContactGenre)
		onSelect(value as ContactGenre)
	}

	return (
		<Combobox
			fullWidth={fullWidth}
			options={options}
			onSelect={handleSelect}
			value={selectedGenre ?? undefined}
		>
			{children}
		</Combobox>
	)
}
