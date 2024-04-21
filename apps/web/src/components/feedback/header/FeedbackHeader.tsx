import FeedbackFilters from '@/components/feedback/header/filters/FeedbackFilters'
import FeedbackSort from '@/components/feedback/header/sort/FeedbackSort'

export default function FeedbackHeader(): JSX.Element {
	return (
		<div className="flex items-center space-x-3 divide-x border-b px-4 py-3">
			<FeedbackSort />
			<div className="pl-3">
				<FeedbackFilters />
			</div>
		</div>
	)
}
