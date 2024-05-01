import { useTranslation } from '@repo/i18n/next/client'
import type { ContactType } from '@repo/prisma/enums'
import { Combobox } from '@repo/ui/combobox'
import type { PropsWithChildren } from 'react'

const contactTypes: ContactType[] = ['ARTIST', 'BAND', 'LABEL', 'MANAGER']

export default function ContactTypeCombobox({
	value,
	onSelect,
	children,
	fullWidth,
	open
}: PropsWithChildren<{
	value?: ContactType | null
	onSelect: (type: ContactType) => void
	fullWidth?: boolean
	open: boolean
}>) {
	const { t } = useTranslation()

	const options = contactTypes.map((type) => ({
		label: t(`contact.type.${type}`),
		value: type
	}))

	const handleSelect = (value: string) => {
		onSelect(value as ContactType)
	}

	return (
		<Combobox open={open} options={options} fullWidth={fullWidth} onSelect={handleSelect} value={value}>
			{children}
		</Combobox>
	)
}
