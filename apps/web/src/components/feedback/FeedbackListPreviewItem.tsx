import type { TFeedback } from '@repo/schemas/feedback'

export default function FeedbackListPreviewItem({ feedback }: { feedback: TFeedback }): JSX.Element {
	return (
		<>
			{feedback.title && <h2>{feedback.title}</h2>}
			{feedback.content}
		</>
	)
}
