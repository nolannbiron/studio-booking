import { getServerSession } from '@repo/feature-auth/lib/getServerSession'
import type { TTeamReply } from '@repo/schemas/team'

export async function getTeam({
	teamSlugOrId
}: {
	teamSlugOrId: string
}): Promise<TTeamReply | { success: false; message: string }> {
	const session = await getServerSession()

	if (!session || !session.user.accessToken) {
		return { success: false, message: 'User not found' }
	}

	const response = (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/team/${teamSlugOrId}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${session.user.accessToken}`
		}
	}).then((res) => res.json())) as TTeamReply | { success: false; message: string }

	return response
}
