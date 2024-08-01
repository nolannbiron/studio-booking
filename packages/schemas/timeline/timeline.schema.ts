import { z } from 'zod'

import { jsonSchema } from '../common'

const ZBaseTimelineEventSchema = z.object({
	id: z.string(),
	entityId: z.string(),
	entityType: z.enum(['CONTACT', 'COMPANY']),
	createdAt: z.date(),
	updatedAt: z.date()
})

export const ZTimelineEventNoteAddedSchema = z.object({
	ownerId: z.string().nullish(),
	creatorModel: z.string(),
	noteId: z.string(),
	teamId: z.string()
})

export const ZTimelineValuesUpdatedSchema = z.object({
	newValue: jsonSchema,
	oldValue: jsonSchema.nullish(),
	attribute: z.string(),
	ownerId: z.string().nullish(),
	creatorModel: z.enum(['USER', 'SYSTEM'])
})

export const ZTimelineEntityCreatedSchema = z.object({
	ownerId: z.string().nullish(),
	creatorModel: z.string()
})

export const ZTimelineEventCreateSchema = ZBaseTimelineEventSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true
})

export const ZTimelineEventUpdateSchema = ZBaseTimelineEventSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true
})

export const ZZTimelineEventReplySchema = ZBaseTimelineEventSchema.extend({
	event: z.union([
		ZTimelineEventNoteAddedSchema,
		ZTimelineValuesUpdatedSchema,
		ZTimelineEntityCreatedSchema
	])
})

export type TTimelineEvent = z.infer<typeof ZBaseTimelineEventSchema>
export type TTimelineNoteAdded = z.infer<typeof ZTimelineEventNoteAddedSchema>
export type TTimelineValuesUpdated = z.infer<typeof ZTimelineValuesUpdatedSchema>
export type TTimelineEntityCreated = z.infer<typeof ZTimelineEntityCreatedSchema>
export type TTimelineEventUpdate = z.infer<typeof ZTimelineEventUpdateSchema>
export type TTimelineEventWithTypedEvent =
	| TTimelineEventValuesUpdated
	| TTimelineEventEntityCreated
	| TTimelineEventNoteAdded

export type TTimelineEventValuesUpdated = TTimelineEvent & {
	type: 'VALUES_UPDATED'
	event: TTimelineValuesUpdated
	entityId: string
	entityType: TTimelineEvent['entityType']
}

export type TTimelineEventEntityCreated = TTimelineEvent & {
	type: 'ENTITY_CREATED'
	event: TTimelineEntityCreated
	entityId: string
	entityType: TTimelineEvent['entityType']
}

export type TTimelineEventNoteAdded = TTimelineEvent & {
	type: 'NOTE_ADDED'
	event: TTimelineNoteAdded
	entityId: string
	entityType: TTimelineEvent['entityType']
}

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
			event: TTimelineNoteAdded
			entityId: string
			entityType: TTimelineEvent['entityType']
	  }
