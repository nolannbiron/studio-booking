import { useGetTeamUsers } from '@/api/team/hooks/useGetTeamUsers'
import EditableLine from '@/components/forms/EditableLine/EditableLine'
import { useTranslation } from '@repo/i18n/next/client'
import type { TBookingSchema } from '@repo/schemas/booking'
import type { ComboboxOption } from '@repo/ui/combobox'
import { UserAvatar } from '@repo/ui/user/UserAvatar'
import { useEffect, useMemo, useState } from 'react'
import { FiUser } from 'react-icons/fi'

export default function BookingDetailsAssigneesEdit({
	assignees,
	onChange
}: {
	assignees: TBookingSchema['assignees']
	onChange: (value: string[]) => void
}): JSX.Element {
	const { t } = useTranslation()
	const { data: dataUsers } = useGetTeamUsers()
	const [value, setValue] = useState<string[]>(assignees.map((a) => a.id))

	useEffect(() => {
		if (assignees) {
			setValue(assignees.map((a) => a.id))
		}
	}, [assignees])

	const options: ComboboxOption<string>[] = useMemo(() => {
		if (!dataUsers) return []

		return dataUsers.members.map((member) => ({
			label: member.user.fullName,
			value: member.user.id,
			element: (label) => (
				<div className="flex items-center gap-2">
					<UserAvatar user={member.user} className="rounded-full" size="2xs" />
					{label}
				</div>
			)
		}))
	}, [dataUsers])

	const handleSelect = (val: string) => {
		if (value.includes(val)) {
			setValue(value.filter((v) => v !== val))
			onChange(value.filter((v) => v !== val))
		} else {
			setValue([...value, val])
			onChange([...value, val])
		}
	}

	return (
		<EditableLine
			label={t('task.assign_to')}
			closeOnSelect
			icon={<FiUser />}
			value={value}
			type="combobox"
			options={options}
			onSelect={handleSelect}
			triggerClassName="flex gap-2 min-h-8 h-fit flex-wrap max-w-full text-sm truncate flex-1 data-[state=open]:z-50 bg-background w-full hover:bg-accent data-[state=open]:hover:bg-background border p-1 rounded-md overflow-hidden border-transparent data-[state=open]:flex-wrap data-[state=open]:border-ring"
		>
			{!value.length
				? t('task.assign_to')
				: value.map((v) => {
						const user = dataUsers?.members.find((m) => m.user.id === v)?.user

						if (!user) return null

						return (
							<div key={`assignees-${user.id}`} className="flex items-center gap-1">
								<UserAvatar user={user} className="rounded-full" size="xs" />
								{user.fullName}
							</div>
						)
					})}
		</EditableLine>
	)
}
