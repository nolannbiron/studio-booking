import i18next from '@repo/i18n/next/client'
import type { ContactType } from '@repo/prisma/enums'
import type { ComboboxProps } from '@repo/ui/combobox'
import { Combobox } from '@repo/ui/combobox'
import type { PropsWithChildren } from 'react'

const contactTypes: ContactType[] = ['ARTIST', 'BAND', 'LABEL', 'MANAGER', 'CAMERAMAN', 'PHOTOGRAPHER']

export const contactTypeComboboxOptions = contactTypes.map((type) => ({
	label: i18next.t(`contact.type.${type}`),
	value: type
}))

type Props = PropsWithChildren<
	{
		fullWidth?: boolean
	} & Omit<ComboboxProps<ContactType>, 'options'>
>

export default function ContactTypeCombobox({ value, onSelect, children, fullWidth, ...props }: Props) {
	return (
		<Combobox
			{...props}
			options={contactTypeComboboxOptions}
			fullWidth={fullWidth}
			onSelect={onSelect}
			value={value}
		>
			{children}
		</Combobox>
	)
}
