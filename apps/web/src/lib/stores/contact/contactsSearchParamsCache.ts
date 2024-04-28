import { ZContactsFiltersSchema } from '@repo/schemas/filters/contact-filters.schema'
import { createSearchParamsCache, parseAsJson } from 'nuqs/server'

export const contactsSearchParamsCache = createSearchParamsCache({
	// List your search param keys and associated parsers here:
	contactsFilters: parseAsJson(ZContactsFiltersSchema.parse)
})
