import ChooseTeamItem from '@/components/team/choose-team-item'
import { createTranslation } from '@repo/i18n/next/server'
import type { TTeam } from '@repo/schemas/team'
import { Button } from '@repo/ui/button'
import { Separator } from '@repo/ui/separator'
import { FiPlus } from 'react-icons/fi'

export default async function ChooseTeam({ teams }: { teams: TTeam[] }) {
	const { t } = await createTranslation()

	return (
		<div className="mx-auto flex h-full w-full max-w-xs flex-col items-center justify-center gap-6 pb-32">
			<div className="text-center">
				<h1 className="text-2xl font-bold">{t('team.choose.header')}</h1>
				<p className="text-muted-foreground text-sm">{t('team.choose.description')}</p>
			</div>
			<div className="w-full space-y-3">
				{teams.map((team) => (
					<ChooseTeamItem key={team.id} team={team} />
				))}
				<Separator />
				<Button variant="outline" size="sm" className="w-full">
					<FiPlus />
					<span className="text-sm">Create a new team</span>
				</Button>
			</div>
		</div>
	)
}
