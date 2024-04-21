'use client'

import { setLocalTeam } from '@/lib/stores/team.store'
import type { TTeam } from '@repo/schemas/team'
import { Card, CardContent } from '@repo/ui/card'
import { TeamAvatar } from '@repo/ui/team/TeamAvatar'
import Link from 'next/link'

export default function ChooseTeamItem({ team }: { team: TTeam }): JSX.Element {
	const handleClick = (team: TTeam) => {
		setLocalTeam(team)
	}

	return (
		<div>
			<Link href={`/${team.slug}`} onClick={() => handleClick(team)}>
				<Card clickable variant="outline" shadow="none">
					<CardContent className="flex items-center gap-3 px-2 py-1">
						<TeamAvatar size="xs" team={team} />
						<div className="">
							<div className="text-sm font-medium opacity-80">{team.name}</div>
							<p className="text-muted-foreground text-xs">{team.slug}</p>
						</div>
					</CardContent>
				</Card>
			</Link>
		</div>
	)
}
