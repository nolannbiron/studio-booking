'use client'

import { FEEDBACK_SORT_OPTIONS } from '@/components/feedback/header/sort/const'
import SortPopover from '@/components/filters/SortPopover'
import { DATE_SORT_OPTIONS } from '@/components/filters/const'
import type { TFilters } from '@/lib/stores/filters.store'
import { useFiltersStore } from '@/lib/stores/filters.store'
import { useTranslation } from '@repo/i18n/next/client'
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel } from '@repo/ui/dropdown-menu'
import { FiCheck } from 'react-icons/fi'

export default function FeedbackSort(): JSX.Element {
	const { t } = useTranslation()
	const { filters, setFilters } = useFiltersStore()

	const handleSelect = (value: TFilters['sortBy']) => {
		setFilters({ sortBy: value === filters?.sortBy ? undefined : value })
	}

	return (
		<SortPopover>
			<DropdownMenuGroup>
				<DropdownMenuLabel className="text-muted-foreground pb-0.5 text-xs">
					{t('sort.date')}
				</DropdownMenuLabel>
				{DATE_SORT_OPTIONS.map((opt) => (
					<DropdownMenuItem
						key={opt.value}
						className="justify-between"
						onClick={() => handleSelect(opt.value)}
					>
						<div className="flex items-center gap-2">
							{opt.icon && <span className="mr-2">{opt.icon}</span>}
							{t(`sort.${opt.value}`)}
						</div>
						{filters?.sortBy === opt.value && <FiCheck className="size-3" />}
					</DropdownMenuItem>
				))}
			</DropdownMenuGroup>

			<DropdownMenuGroup className="mt-2">
				<DropdownMenuLabel className="text-muted-foreground pb-0.5 text-xs">
					{t('sort.attributes')}
				</DropdownMenuLabel>
				{FEEDBACK_SORT_OPTIONS.map((opt) => (
					<DropdownMenuItem
						key={opt.value}
						className="justify-between"
						onClick={() => handleSelect(opt.value)}
					>
						<div className="flex items-center gap-2">
							{opt.icon && <span className="mr-2">{opt.icon}</span>}
							{t(`sort.${opt.value}`)}
						</div>
						{filters?.sortBy === opt.value && <FiCheck className="size-3" />}
					</DropdownMenuItem>
				))}
			</DropdownMenuGroup>
		</SortPopover>
	)
}
