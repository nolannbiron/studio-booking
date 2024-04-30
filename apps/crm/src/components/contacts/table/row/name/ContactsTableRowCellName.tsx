import type { TContact } from '@repo/schemas/contact'
import { Checkbox } from '@repo/ui/checkbox'
import { UserAvatar } from '@repo/ui/user/UserAvatar'
import { Link } from 'react-router-dom'

export default function ContactsTableRowCellName({ contact }: { contact: TContact }): JSX.Element {
	return (
		<div className="flex h-full max-w-full items-center gap-3 pl-5 pr-3">
			<div className="flex">
				<Checkbox />
			</div>
			<Link
				to={`/contact/${contact.id}`}
				className="hover:bg-muted flex cursor-pointer items-center gap-2 truncate rounded-lg py-0.5 pl-1 pr-1.5 transition-all"
			>
				<UserAvatar user={contact.user} size="2xs" />
				<span className="before:bg-muted relative truncate before:absolute before:bottom-0 before:h-px before:w-full">
					{contact.name}
				</span>
			</Link>
		</div>
	)
}
