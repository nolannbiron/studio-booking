import type { SortOption } from '@/components/filters/const'
import type { TBookingSortName } from '@repo/schemas/filters/booking-filters.schema'
import { bookingSortEnum } from '@repo/schemas/filters/booking-filters.schema'
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
	},

	{
		value: bookingSortEnum.enum.createdAt,
		icon: <TbSortAscendingLetters />
	},
	{
		value: bookingSortEnum.enum.updatedAt,
		icon: <TbSortAscendingLetters />
	}
]
