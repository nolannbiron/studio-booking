import { MdOutlineCalendarToday, MdOutlineEditCalendar } from 'react-icons/md'
import { z } from 'zod'

export const dateSortOptionsEnum = z.enum(['creation_date', 'update_date'])
type DateSortOptionName = z.infer<typeof dateSortOptionsEnum>

export type SortOption<T extends string> = {
	value: T
	icon?: React.ReactNode
}

export const DATE_SORT_OPTIONS: SortOption<DateSortOptionName>[] = [
	{
		value: dateSortOptionsEnum.enum.creation_date,
		icon: <MdOutlineCalendarToday />
	},
	{
		value: dateSortOptionsEnum.enum.update_date,
		icon: <MdOutlineEditCalendar />
	}
]
