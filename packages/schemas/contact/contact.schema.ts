import type { Prisma } from '@repo/prisma/client'
import { ContactType } from '@repo/prisma/enums'
import { z } from 'zod'

import { ZUserSchema } from '../user'

export const ZContactSchema = z.object({
	name: z.string().min(3),
	email: z.string().email(),
	phone: z.string().nullish(),
	type: z.nativeEnum(ContactType),
	user: z.lazy(() => ZUserSchema)
})

export const ZCreateContactSchema = ZContactSchema.omit({ user: true })
export const ZUpdateContactSchema = ZContactSchema.omit({ user: true, email: true }).partial()

export type TContactSchema = z.infer<typeof ZContactSchema>
export type TCreateContactSchema = z.infer<typeof ZCreateContactSchema>
export type TUpdateContactSchema = z.infer<typeof ZUpdateContactSchema>

export type TCreateContactRequest = {
	Body: TCreateContactSchema
	Params: { teamId: string }
}

export type TUpdateContactRequest = {
	Body: TUpdateContactSchema
	Params: { teamId: string; contactId: string }
}

export type TDeleteContactRequest = {
	Params: { teamId: string; contactId: string }
}

export type TContactFilters = Prisma.ContactWhereInput
export type TContactSort = Prisma.ContactOrderByWithRelationAndSearchRelevanceInput

export type TGetContactsRequest = {
	Body: {
		limit?: number
		offset?: number
		search?: string
		filters?: TContactFilters
		sort?: TContactSort
	}
	Params: { teamId: string }
}

export type TGetContactRequest = {
	Params: { teamId: string; contactId: string }
}
