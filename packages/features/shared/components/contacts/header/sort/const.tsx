import type { SortOption } from '@/components/filters/const'
import type { TContactSortName } from '@repo/schemas/filters/contact-filters.schema'
import { contactSortEnum } from '@repo/schemas/filters/contact-filters.schema'
import { MdArrowDropDown } from 'react-icons/md'
import { TbSortAscendingLetters } from 'react-icons/tb'

export const CONTACT_SORT_OPTIONS: SortOption<TContactSortName>[] = [
	{
		value: contactSortEnum.enum.name,
		icon: <TbSortAscendingLetters />
	},
	{
		value: contactSortEnum.enum.type,
		icon: <MdArrowDropDown />
	}
]
