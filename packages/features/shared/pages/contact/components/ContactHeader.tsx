import { useUpdateContact } from '@/api/contact/hooks/useUpdateContact'
import EditableLineTextComponent from '@/components/forms/EditableLine/components/EditableLineTextComponent'
import type { TContact } from '@repo/schemas/contact'
import { UserAvatar } from '@repo/ui/user/UserAvatar'
import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'

export default function ContactHeader({ contact }: { contact: TContact }): JSX.Element {
	const { mutate } = useUpdateContact()
	const [value, setValue] = useState(contact.name)
	const [user, setUser] = useState(contact)

	useEffect(() => {
		setValue(contact.name)
		setUser(contact)
	}, [contact])

	const handleSubmit = () => {
		mutate({ contactId: contact.id, teamId: contact.teamId, name: value })
	}

	useDebounce(
		() => {
			if (!value || value === contact.name) return
			handleSubmit()
		},
		1000,
		[value]
	)

	return (
		<div className="border-b px-5 py-4">
			<div className="flex items-center gap-3">
				<UserAvatar user={user} size="sm" />
				<div>
					<EditableLineTextComponent
						placeholder="Set name"
						onChange={setValue}
						value={value}
						className="text-lg"
					/>
				</div>
			</div>
		</div>
	)
}
