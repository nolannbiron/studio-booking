import TeamSettings from '@/components/settings/team/team-settings'
import { getTeam } from '@/lib/server/team/getTeam'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AccountSettingsPage({ params }: { params: { slug: string } }) {
	const res = await getTeam({
		teamSlugOrId: params.slug
	})

	if (!res.success) {
		return <></>
	}

	return <TeamSettings team={res.team} />
}
