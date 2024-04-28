import ChooseTeamItem from '@/components/team/choose-team-item'
import { getTeamsForUser } from '@/lib/server/team/getTeamsForUser'
import { createTranslation } from '@repo/i18n/next/server'
import { Button } from '@repo/ui/button'
import { Separator } from '@repo/ui/separator'
import { redirect } from 'next/navigation'
import { FiPlus } from 'react-icons/fi'

export default async function TeamsPage() {
	const teams = await getTeamsForUser()
	const { t } = await createTranslation()

	if (!teams) return redirect('/create-team')

	if (teams.length === 1) return redirect(`/${teams[0].slug}`)

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
				<Button variant="outline" className="w-full">
					<FiPlus />
					<span className="text-sm">{t('button.create_team')}</span>
				</Button>
			</div>
		</div>
	)
}
