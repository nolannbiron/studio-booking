import { getServerSession } from '@repo/feature-auth/lib/getServerSession'
import type { TTeam, TTeamsReply } from '@repo/schemas/team'

export async function getTeamsForUser(): Promise<TTeam[] | null> {
	const session = await getServerSession()

	if (!session || !session.user.accessToken) {
		return null
	}

	const response = (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/teams`, {
		headers: {
			Authorization: `Bearer ${session.user.accessToken}`
		}
	}).then((res) => res.json())) as TTeamsReply

	if (!response.success) {
		return null
	}

	return response.teams
}
