import FeedbackHeader from '@/components/feedback/header/FeedbackHeader'
import { getTeamFeedbacks } from '@/lib/server/feedback/getFeedbacks'

export const dynamic = 'force-dynamic'
export const revalidate = 30

export default async function FeedbacksPage({ params: { slug } }: { params: { slug: string } }) {
	const data = await getTeamFeedbacks({ teamSlugOrId: slug })

	if (!data.success) {
		return <></>
	}

	return (
		<div>
			<FeedbackHeader />
			{/* <div className="flex flex-col gap-10 p-6">
				{data.feedbacks.map((feedback) => (
					<Link key={feedback.id} href={`/${slug}/feedback/${feedback.id}`} className="w-full">
						<FeedbackListPreviewItem feedback={feedback} />
					</Link>
				))}
			</div> */}
		</div>
	)
}
