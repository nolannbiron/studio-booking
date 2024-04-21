import type { TTeam } from '@repo/schemas/team'

import type { AvatarProps } from '../ui/avatar'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export function TeamAvatar({ team, ...props }: { team: TTeam } & AvatarProps): JSX.Element {
	return (
		<Avatar className="shrink-0 border-0" {...props}>
			{team.logoUrl && <AvatarImage src={team.logoUrl} />}
			<AvatarFallback
				style={{
					backgroundColor: `hsl(${team.color})`
				}}
				className="text-primary-foreground uppercase"
			>
				{team.name
					.split(' ')
					.map((word) => word[0])
					.slice(0, 2)
					.join('')}
			</AvatarFallback>
		</Avatar>
	)
}
