import { useGetTeamUsers } from '@/api/team/hooks/useGetTeamUsers'
import { useUserStore } from '@/state/user.state'
import { useTranslation } from '@repo/i18n/next/client'
import type { TTaskCreateSchema, TTaskSchema, TTaskUpdateSchema } from '@repo/schemas/task'
import { Button } from '@repo/ui/button'
import type { ComboboxOption } from '@repo/ui/combobox'
import { Combobox } from '@repo/ui/combobox'
import { UserAvatar } from '@repo/ui/user/UserAvatar'
import { useEffect, useMemo, useState } from 'react'
import { FiAtSign } from 'react-icons/fi'

export default function TaskAssigneesPicker({
	task,
	onChange
}: {
	task?: Partial<TTaskCreateSchema | TTaskUpdateSchema | TTaskSchema>
	onChange: (value: string[]) => void
}): JSX.Element {
	const { t } = useTranslation()
	const { currentUser } = useUserStore()
	const { data } = useGetTeamUsers()
	const [value, setValue] = useState<string[]>(
		task?.assignees?.map((a) => (typeof a === 'string' ? a : a.id)) ?? []
	)

	useEffect(() => {
		if (task && task.assignees) {
			setValue(task.assignees.map((a) => (typeof a === 'string' ? a : a.id)))
		}
	}, [task])

	const options: ComboboxOption<string>[] = useMemo(() => {
		if (!data) return []

		return data.members.map((member) => ({
			label: `${member.user.fullName}${currentUser.id === member.userId ? ` (${t('general.you')})` : ''}`,
			value: member.user.id,
			element: (label) => (
				<div className="flex items-center gap-2">
					<UserAvatar user={member.user} className="rounded-full" size="2xs" />
					{label}
				</div>
			)
		}))
	}, [data, currentUser.id, t])

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
		<Combobox modal shouldShowInput value={value} onSelect={handleSelect} options={options}>
			<Button variant="ghost" size="sm" className="px-1">
				<FiAtSign />
				{value.length === 1 && value.includes(currentUser.id)
					? t('task.assigned_to_you')
					: !value.length
						? t('task.assign_to')
						: value.map((v) => options.find((o) => o.value === v)?.label).join(', ')}
			</Button>
		</Combobox>
	)
}
