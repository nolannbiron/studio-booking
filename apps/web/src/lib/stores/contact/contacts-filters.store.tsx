import { type TContactFilters, ZContactsFiltersSchema } from '@repo/schemas/filters/contact-filters.schema'
import { parseAsJson, useQueryState } from 'nuqs'

const defaultFilters: TContactFilters = {
	sortBy: undefined,
	type: undefined,
	search: undefined
}

export const useContactsFiltersStore = () => {
	const [filters, setFilters] = useQueryState('contactsFilters', {
		...parseAsJson(ZContactsFiltersSchema.parse),
		defaultValue: defaultFilters
	})

	const resetFilters = () => {
		setFilters(defaultFilters)
	}

	return { filters, setFilters, resetFilters }
}
