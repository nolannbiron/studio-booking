import type { SortOption } from '@/components/filters/const'
import type { TBookingSortName } from '@repo/schemas/filters/booking-filters.schema'
import { bookingSortEnum } from '@repo/schemas/filters/booking-filters.schema'
import { MdOutlineCalendarToday, MdOutlineEditCalendar } from 'react-icons/md'
import { TbSortAscendingLetters } from 'react-icons/tb'

export const BOOKING_SORT_OPTIONS: SortOption<TBookingSortName>[] = [
	{
		value: bookingSortEnum.enum.title,
		icon: <TbSortAscendingLetters />
	},
	{
		value: bookingSortEnum.enum.startDate,
		icon: <TbSortAscendingLetters />
	},
	{
		value: bookingSortEnum.enum.endDate,
		icon: <TbSortAscendingLetters />
	}
]

export const BOOKING_DATE_SORT_OPTIONS: SortOption<TBookingSortName>[] = [
	{
		value: bookingSortEnum.enum.startDate,
		icon: <MdOutlineCalendarToday />
	},
	{
		value: bookingSortEnum.enum.endDate,
		icon: <MdOutlineEditCalendar />
	}
]
