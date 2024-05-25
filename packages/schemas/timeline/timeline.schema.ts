import { EventType } from '@repo/prisma/enums'
import { z } from 'zod'

import { jsonSchema } from '../common'

export const ZTimelineEventSchema = z.object({
	id: z.string(),
	type: z.nativeEnum(EventType),
	event: jsonSchema,
	entityId: z.string(),
	entityType: z.enum(['CONTACT', 'COMPANY']),
	createdAt: z.date(),
	updatedAt: z.date()
})

export const ZTimelineEventNoteAddedSchema = z.object({
	creatorId: z.string().nullish(),
	creatorModel: z.string(),
	noteId: z.string(),
	teamId: z.string()
})

export const ZTimelineValuesUpdatedSchema = z.object({
	newValue: jsonSchema,
	oldValue: jsonSchema.nullish(),
	attribute: z.string(),
	creatorId: z.string().nullish(),
	creatorModel: z.enum(['USER', 'SYSTEM'])
})

export const ZTimelineEntityCreatedSchema = z.object({
	creatorId: z.string().nullish(),
	creatorModel: z.string()
})

export const ZTimelineEventCreateSchema = ZTimelineEventSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true
})

export const ZTimelineEventUpdateSchema = ZTimelineEventSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true
})

export const ZZTimelineEventReplySchema = ZTimelineEventSchema.omit({
	event: true
}).extend({
	event: z.union([
		ZTimelineEventNoteAddedSchema,
		ZTimelineValuesUpdatedSchema,
		ZTimelineEntityCreatedSchema
	])
})

export type TTimelineEvent = z.infer<typeof ZTimelineEventSchema>
export type TTimelineEventNoteAdded = z.infer<typeof ZTimelineEventNoteAddedSchema>
export type TTimelineValuesUpdated = z.infer<typeof ZTimelineValuesUpdatedSchema>
export type TTimelineEntityCreated = z.infer<typeof ZTimelineEntityCreatedSchema>
export type TTimelineEventUpdate = z.infer<typeof ZTimelineEventUpdateSchema>
export type TTimelineEventWithTypedEvent = z.infer<typeof ZZTimelineEventReplySchema>

export type TTimelineEventsReply = {
	success: true
	events: TTimelineEventWithTypedEvent[]
}

export type TGetTimelineEventsContact = {
	Params: { contactId: string }
	Reply: TTimelineEventsReply | { success: false; message: unknown }
}

export type TGetTimelineEventsCompany = {
	Params: { companyId: string }
	Reply: TTimelineEventsReply | { success: false; message: unknown }
}

export type TTimelineEventCreateSchema =
	| {
			type: 'VALUES_UPDATED'
			event: TTimelineValuesUpdated
			entityId: string
			entityType: TTimelineEvent['entityType']
	  }
	| {
			type: 'ENTITY_CREATED'
			event: TTimelineEntityCreated
			entityId: string
			entityType: TTimelineEvent['entityType']
	  }
	| {
			type: 'NOTE_ADDED'
			event: TTimelineEventNoteAdded
			entityId: string
			entityType: TTimelineEvent['entityType']
	  }
