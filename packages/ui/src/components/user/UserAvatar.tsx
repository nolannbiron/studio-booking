import { getRandomAvatarColor } from '@repo/features/auth/lib/getRandomAvatarColor'
import type { TPublicUser } from '@repo/schemas/user'

import type { AvatarProps } from '../ui/avatar'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export function UserAvatar({
	user,
	...props
}: {
	user: Partial<Pick<TPublicUser, 'firstName' | 'lastName' | 'avatarUrl' | 'avatarColor'>>
} & AvatarProps): JSX.Element {
	return (
		<Avatar {...props}>
			{user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
			<AvatarFallback
				className="text-background dark:text-foreground bg-foreground"
				style={{
					backgroundColor: user.avatarColor
						? `hsl(${user.avatarColor})`
						: `hsl(${getRandomAvatarColor()})`
				}}
			>
				{user.firstName?.[0]}
			</AvatarFallback>
		</Avatar>
	)
}
