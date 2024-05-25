import { MdArrowDropDown } from 'react-icons/md'

type FilterOption<T extends string> = {
	value: T
	icon?: React.ReactNode
}

export const BOOKING_FILTERS_OPTIONS: FilterOption<'type'>[] = [
	{
		value: 'type',
		icon: <MdArrowDropDown />
	}
]
