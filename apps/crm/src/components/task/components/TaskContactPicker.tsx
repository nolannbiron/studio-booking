import { useGetTeamContacts } from '@/api/contact/hooks/useGetTeamContacts'
import { useTranslation } from '@repo/i18n/next/client'
import type { TTaskCreateSchema, TTaskSchema, TTaskUpdateSchema } from '@repo/schemas/task'
import { Button } from '@repo/ui/button'
import type { ComboboxOption } from '@repo/ui/combobox'
import { Combobox } from '@repo/ui/combobox'
import { UserAvatar } from '@repo/ui/user/UserAvatar'
import { useEffect, useMemo, useState } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'

export default function TaskContactPicker({
	task,
	onChange,
	disabled
}: {
	task?: Partial<TTaskCreateSchema | TTaskUpdateSchema | TTaskSchema>
	onChange?: (value: string) => void
	disabled?: boolean
}): JSX.Element {
	const { t } = useTranslation()
	const { data } = useGetTeamContacts({})
	const [value, setValue] = useState<string>(task?.entityId ?? '')

	useEffect(() => {
		if (task && task.entityId) {
			setValue(task.entityId)
		}
	}, [task])

	const options: ComboboxOption<string>[] = useMemo(() => {
		if (!data) return []

		return data.contacts.map((contact) => ({
			label: `${contact.name}`,
			value: contact.id,
			element: (label) => (
				<div className="flex items-center gap-2">
					<UserAvatar user={contact} className="rounded-full" size="2xs" />
					{label}
				</div>
			)
		}))
	}, [data])

	const handleSelect = (val: string) => {
		setValue(val)
		onChange?.(val)
	}

	return (
		<Combobox
			disabled={disabled}
			shouldShowInput
			closeOnSelect
			value={value}
			onSelect={handleSelect}
			options={options}
		>
			<Button disabled={disabled} variant="ghost" size="sm" className="px-1">
				<FiArrowUpRight />
				{!value ? t('task.link_contact') : options.find((o) => o.value === value)?.label}
			</Button>
		</Combobox>
	)
}
