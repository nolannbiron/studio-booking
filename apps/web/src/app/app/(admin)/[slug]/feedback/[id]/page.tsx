import { getFeedbackById } from '@/lib/server/feedback/getFeedbackById'

export default async function FeedbackPage({
	params: { slug, id }
}: {
	params: { slug: string; id: string }
}) {
	const result = await getFeedbackById({
		teamSlugOrId: slug,
		feedbackId: id
	})

	if (!result.success) {
		return <></>
	}

	return <>{result.feedback.id}</>
}
