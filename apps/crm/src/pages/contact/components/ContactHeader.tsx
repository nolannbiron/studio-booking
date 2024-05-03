import { getRandomAvatarColor } from '@repo/feature-auth/lib/getRandomAvatarColor'
import type { TContact } from '@repo/schemas/contact'
import { UserAvatar } from '@repo/ui/user/UserAvatar'

export default function ContactHeader({ contact }: { contact: TContact }): JSX.Element {
	return (
		<div className="border-b px-5 py-4">
			<div className="flex items-center gap-3">
				<UserAvatar
					user={
						contact.user ?? {
							firstName: contact.name.split(' ')[0],
							lastName: contact.name.split(' ')[1],
							avatarColor: getRandomAvatarColor()
						}
					}
					size="sm"
				/>

				<span className="text-lg">{contact.name}</span>
			</div>
		</div>
	)
}
