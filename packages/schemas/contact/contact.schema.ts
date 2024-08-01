import { ContactType } from '@repo/prisma/enums'
import { z } from 'zod'

import type { TContactFilters } from '../filters/contact-filters.schema'
import { ZContactGenreSchema } from './contact-genre.schema'

export const ZContactSchema = z.object({
	id: z.string(),
	name: z.string().min(3, { message: 'required' }),
	email: z.string().email().nullish(),
	phone: z.string().nullish(),
	type: z.nativeEnum(ContactType).nullish(),
	genres: z.array(ZContactGenreSchema).nullish(),
	instagram: z.string().nullish(),
	facebook: z.string().nullish(),
	twitter: z.string().nullish(),
	youtube: z.string().nullish(),
	tiktok: z.string().nullish(),
	spotify: z.string().nullish(),
	snapchat: z.string().nullish(),
	website: z.string().nullish(),
	avatarUrl: z.string(),
	teamId: z.string()
})

export const ZCreateContactSchema = ZContactSchema.omit({
	user: true,
	genres: true,
	id: true,
	avatarUrl: true
})
export const ZUpdateContactSchema = ZContactSchema.omit({
	id: true,
	user: true,
	genres: true,
	avatarUrl: true
})
	.extend({
		genres: z.array(z.string()).nullish()
	})
	.partial()

export type TContact = z.infer<typeof ZContactSchema>
export type TCreateContact = z.infer<typeof ZCreateContactSchema>
export type TUpdateContact = z.infer<typeof ZUpdateContactSchema>

export type TCreateContactRequest = {
	Body: TCreateContact
	Params: { teamId: string }
}

export type TUpdateContactRequest = {
	Body: TUpdateContact
	Params: { teamId: string; id: string }
}

export type TDeleteContactRequest = {
	Params: { teamId: string; id: string }
}

export type TGetContactsRequest = {
	Querystring: TContactFilters
	Params: { teamId: string }
	Reply: TContactsReply | { success: false; message: unknown }
}

export type TGetContactRequest = {
	Params: { teamId: string; id: string }
	Reply: TContactReply | { success: false; message: unknown }
}

export type TContactReply = {
	success: true
	contact: TContact
}

export type TContactsReply = {
	success: true
	contacts: TContact[]
}
