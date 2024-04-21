import { getServerSession } from '@repo/feature-auth/lib/getServerSession'
import type { TFeedbackReply } from '@repo/schemas/feedback'

export async function getFeedbackById({
	teamSlugOrId,
	feedbackId
}: {
	teamSlugOrId: string
	feedbackId: string
}): Promise<TFeedbackReply> {
	const session = await getServerSession()

	if (!session || !session.user.accessToken) {
		return { success: false, message: 'User not found' }
	}

	const response = (await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/v1/team/${teamSlugOrId}/feedback/${feedbackId}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${session.user.accessToken}`
			}
		}
	).then((res) => res.json())) as TFeedbackReply

	return response
}
