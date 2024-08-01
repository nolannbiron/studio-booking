import { z } from 'zod'

import { jsonSchema } from '../common'
import { ZContactSchema } from '../contact'
import { ZPublicUserSchema } from '../user'

export const ZNoteSchema = z.object({
	id: z.string(),
	title: z.string(),
	content: jsonSchema.nullish(),
	entityId: z.string(),
	entityType: z.enum(['CONTACT', 'COMPANY']),
	entity: z
		.lazy(() => ZContactSchema.pick({ id: true, name: true, avatarUrl: true, teamId: true }))
		.nullish(),
	teamId: z.string(),
	ownerId: z.string().nullish(),
	creator: z.lazy(() => ZPublicUserSchema).nullish(),
	createdAt: z.date(),
	updatedAt: z.date()
})

export const ZNoteCreateSchema = ZNoteSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	creator: true
})
export const ZNoteUpdateSchema = ZNoteSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	creator: true,
	ownerId: true,
	teamId: true
}).partial()

export type TNoteSchema = z.infer<typeof ZNoteSchema>
export type TNoteCreateSchema = z.infer<typeof ZNoteCreateSchema>
export type TNoteUpdateSchema = z.infer<typeof ZNoteUpdateSchema>

export type TNotesReply = {
	success: true
	notes: TNoteSchema[]
}

export type TNoteReply = {
	success: true
	note: TNoteSchema
}

export type TGetNoteRequest = {
	Querystring: {
		ownerId?: string
		entityId?: string
		teamId: string
	}
	Params: { noteId: string }
	Reply: TNoteReply | { success: false; message: unknown }
}

export type TGetNotesRequest = {
	Querystring: {
		ownerId?: string
		entityId?: string
		teamId: string
	}
	Reply: TNotesReply | { success: false; message: unknown }
}

export type TNotesCountReply = {
	success: true
	total: number
}

export type TGetNotesCountRequest = {
	Querystring: {
		ownerId?: string
		entityId?: string
		teamId: string
	}
	Reply: TNotesCountReply | { success: false; message: unknown }
}

export type TCreateNoteRequest = {
	Body: TNoteCreateSchema
	Reply: TNoteReply | { success: false; message: unknown }
}

export type TUpdateNoteRequest = {
	Body: TNoteUpdateSchema
	Params: { noteId: string }
	Reply: TNoteReply | { success: false; message: unknown }
}

export type TDeleteNoteRequest = {
	Params: { noteId: string }
	Reply: { success: true } | { success: false; message: unknown }
}
