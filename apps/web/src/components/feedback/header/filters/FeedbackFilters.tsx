'use client'

import { FEEDBACK_SORT_OPTIONS } from '@/components/feedback/header/sort/const'
import NewFilterWrapper from '@/components/filters/NewFilter'
import { DATE_SORT_OPTIONS } from '@/components/filters/const'
import { useTranslation } from '@repo/i18n/next/client'
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel } from '@repo/ui/dropdown-menu'

export default function FeedbackFilters(): JSX.Element {
	const { t } = useTranslation()

	return (
		<NewFilterWrapper>
			<DropdownMenuGroup>
				<DropdownMenuLabel className="text-muted-foreground pb-0.5 text-xs">
					{t('filters.choose_filter')}
				</DropdownMenuLabel>
				{DATE_SORT_OPTIONS.map((opt) => (
					<DropdownMenuItem key={opt.value}>
						{opt.icon && <span className="mr-2">{opt.icon}</span>}
						{t(`sort.${opt.value}`)}
					</DropdownMenuItem>
				))}

				{FEEDBACK_SORT_OPTIONS.map((opt) => (
					<DropdownMenuItem key={opt.value}>
						{opt.icon && <span className="mr-2">{opt.icon}</span>}
						{t(`sort.${opt.value}`)}
					</DropdownMenuItem>
				))}
			</DropdownMenuGroup>
		</NewFilterWrapper>
	)
}
