import type { SortOption } from '@/components/filters/const'
import { IoMdHappy } from 'react-icons/io'
import { MdArrowDropDown } from 'react-icons/md'
import { z } from 'zod'

export const contactSortOptionsEnum = z.enum(['sentiment', 'type'])
type ContactSortOptionName = z.infer<typeof contactSortOptionsEnum>

export const CONTACT_SORT_OPTIONS: SortOption<ContactSortOptionName>[] = [
	{
		value: contactSortOptionsEnum.enum.sentiment,
		icon: <IoMdHappy />
	},
	{
		value: contactSortOptionsEnum.enum.type,
		icon: <MdArrowDropDown />
	}
]
