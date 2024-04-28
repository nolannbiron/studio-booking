import { useTranslation } from '@repo/i18n/next/client'
import type { ContactType } from '@repo/prisma/enums'
import { Combobox } from '@repo/ui/combobox'
import type { PropsWithChildren } from 'react'
import { useState } from 'react'

const contactTypes: ContactType[] = ['ARTIST', 'COMPANY', 'GROUP', 'LABEL', 'MANAGER']

export default function ContactTypeCombobox({
	value,
	onSelect,
	children,
	fullWidth
}: PropsWithChildren<{
	value?: ContactType | null
	onSelect: (type: ContactType) => void
	fullWidth?: boolean
}>) {
	const { t } = useTranslation()
	const [selectedType, setSelectedType] = useState(value)

	const options = contactTypes.map((type) => ({
		label: t(`contact.type.${type}`),
		value: type
	}))

	const handleSelect = (value: string) => {
		setSelectedType(value as ContactType)
		onSelect(value as ContactType)
	}

	return (
		<Combobox
			options={options}
			fullWidth={fullWidth}
			onSelect={handleSelect}
			value={selectedType ?? undefined}
		>
			{children}
		</Combobox>
	)
}
