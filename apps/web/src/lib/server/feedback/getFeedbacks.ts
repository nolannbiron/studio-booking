import { getServerSession } from '@repo/feature-auth/lib/getServerSession'
import type { TFeedbacksReply } from '@repo/schemas/feedback'

export async function getTeamFeedbacks({ teamSlugOrId }: { teamSlugOrId: string }): Promise<TFeedbacksReply> {
	const session = await getServerSession()

	if (!session || !session.user.accessToken) {
		return { success: false, message: 'User not found' }
	}

	const response = (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/team/${teamSlugOrId}/feedbacks`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${session.user.accessToken}`
		}
	}).then((res) => res.json())) as TFeedbacksReply

	return response
}
