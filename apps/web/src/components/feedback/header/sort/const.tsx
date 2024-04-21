import type { SortOption } from '@/components/filters/const'
import { IoMdHappy } from 'react-icons/io'
import { MdArrowDropDown } from 'react-icons/md'
import { z } from 'zod'

export const feedbackSortOptionsEnum = z.enum(['sentiment', 'type'])
type FeedbackSortOptionName = z.infer<typeof feedbackSortOptionsEnum>

export const FEEDBACK_SORT_OPTIONS: SortOption<FeedbackSortOptionName>[] = [
	{
		value: feedbackSortOptionsEnum.enum.sentiment,
		icon: <IoMdHappy />
	},
	{
		value: feedbackSortOptionsEnum.enum.type,
		icon: <MdArrowDropDown />
	}
]
