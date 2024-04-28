import { ContactType } from '@repo/prisma/enums'
import { z } from 'zod'

import { dateSortEnum } from './base-filters.schema'

export const contactSortEnum = z.enum(['name', 'type'])
export type TContactSortName = z.infer<typeof contactSortEnum>

export const ZContactsFiltersSchema = z.object({
	sortBy: dateSortEnum.or(contactSortEnum).optional(),
	type: z.nativeEnum(ContactType).array().optional(),
	search: z.string().optional()
})

export type TContactFilters = z.infer<typeof ZContactsFiltersSchema>
