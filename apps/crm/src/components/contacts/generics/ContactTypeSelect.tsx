import ContactTypeCombobox from '@/components/contacts/generics/ContactTypeCombobox'
import { useTranslation } from '@repo/i18n/next/client'
import type { ContactType } from '@repo/prisma/enums'
import { Button } from '@repo/ui/button'
import { useState } from 'react'
import { HiSelector } from 'react-icons/hi'

export default function ContactTypeSelect({
	type,
	onSelect
}: {
	type?: ContactType | null
	onSelect: (type: ContactType) => void
}) {
	const { t } = useTranslation()
	const [selectedType, setSelectedType] = useState(type)

	const handleSelect = (value: string) => {
		setSelectedType(value as ContactType)
		onSelect(value as ContactType)
	}

	return (
		<ContactTypeCombobox fullWidth onSelect={handleSelect} value={selectedType ?? undefined}>
			<Button size="md" type="button" variant="outline" className="w-full justify-between">
				{selectedType ? (
					<div className="flex items-center gap-2">
						<span>{t(`contact.type.${selectedType}`)}</span>
					</div>
				) : (
					<span className="text-muted-foreground/50">{t('contact.type.select_type')}</span>
				)}
				<HiSelector />
			</Button>
		</ContactTypeCombobox>
	)
}
