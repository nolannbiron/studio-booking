import type { TDateSortName } from '@repo/schemas/filters/base-filters.schema'
import { dateSortEnum } from '@repo/schemas/filters/base-filters.schema'
import { MdOutlineCalendarToday, MdOutlineEditCalendar } from 'react-icons/md'

export type SortOption<T extends string> = {
	value: T
	icon?: React.ReactNode
}

export const DATE_SORT_OPTIONS: SortOption<TDateSortName>[] = [
	{
		value: dateSortEnum.enum.createdAt,
		icon: <MdOutlineCalendarToday />
	},
	{
		value: dateSortEnum.enum.updatedAt,
		icon: <MdOutlineEditCalendar />
	}
]
