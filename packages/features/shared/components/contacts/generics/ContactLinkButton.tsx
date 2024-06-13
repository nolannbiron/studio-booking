import type { TContact } from '@repo/schemas/contact'
import { cn } from '@repo/ui/lib/utils'
import { UserAvatar } from '@repo/ui/user/UserAvatar'
import { Link } from 'react-router-dom'

export default function ContactLinkButton({
	contact,
	className
}: {
	contact: TContact
	className?: string
}): JSX.Element {
	return (
		<Link
			to={`/contact/${contact.id}`}
			className={cn(
				'hover:bg-muted flex cursor-pointer select-none flex-row items-center gap-1 rounded-md border-transparent px-0.5 py-0.5 pr-1 text-sm transition-all',
				className
			)}
		>
			<UserAvatar className="rounded-full" size="2xs" user={contact} />
			<div>{contact.name}</div>
		</Link>
	)
}
