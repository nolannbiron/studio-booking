import { feedbackSortOptionsEnum } from '@/components/feedback/header/sort/const'
import { dateSortOptionsEnum } from '@/components/filters/const'
import { parseAsJson, useQueryState } from 'nuqs'
import { z } from 'zod'

export const filtersSchema = z.object({
	sortBy: dateSortOptionsEnum.or(feedbackSortOptionsEnum).optional()
})

export type TFilters = z.infer<typeof filtersSchema>

const defaultFilters: TFilters = {
	sortBy: undefined
}

export const useFiltersStore = () => {
	const [filters, setFilters] = useQueryState('filters', {
		...parseAsJson(filtersSchema.parse),
		defaultValue: defaultFilters
	})

	const resetFilters = () => {
		setFilters(defaultFilters)
	}

	return { filters, setFilters, resetFilters }
}
