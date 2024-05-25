import { prisma } from '@repo/prisma'
import type { Prisma } from '@repo/prisma/client'
import type {
	TGetTimelineEventsContact,
	TTimelineEventCreateSchema,
	TTimelineEventWithTypedEvent
} from '@repo/schemas/timeline'
import type { FastifyRequest } from 'fastify'

export class TimelineRepository {
	static async getTimelineEventsContact(req: FastifyRequest<TGetTimelineEventsContact>) {
		const { contactId } = req.params

		const contact = await prisma.contact.exists({
			where: {
				id: contactId,
				team: {
					members: {
						some: {
							accepted: true,
							userId: req.user?.id
						}
					}
				}
			}
		})

		if (!contact) {
			throw 'Contact not found'
		}

		const events = await prisma.timelineEvent.findMany({
			where: {
				entityId: contactId
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		return events as TTimelineEventWithTypedEvent[]
	}

	static async createEvent(event: TTimelineEventCreateSchema) {
		// check if an event with the same type and entityId already exists (in the last 15min)
		const exists = (await prisma.timelineEvent.findMany({
			where: {
				entityId: event.entityId,
				type: event.type,
				...(event.type === 'VALUES_UPDATED'
					? {
							event: {
								path: ['attribute'],
								equals: event.event.attribute
							}
						}
					: {}),
				createdAt: {
					gt: new Date(Date.now() - 15 * 60 * 1000)
				}
			}
		})) as TTimelineEventWithTypedEvent[]

		if (exists.length > 0) {
			const lastEvent = exists[exists.length - 1]

			console.log('lastEvent', lastEvent)

			if (lastEvent.type === 'VALUES_UPDATED' && event.type === 'VALUES_UPDATED') {
				if (
					lastEvent.event.oldValue === event.event.newValue
					// ||
					// (Array.isArray(lastEvent.event.oldValue) &&
					// 	Array.isArray(event.event.newValue) &&
					// 	JSON.stringify(lastEvent.event.oldValue) === JSON.stringify(event.event.newValue))
				) {
					return prisma.timelineEvent.delete({
						where: {
							id: lastEvent.id
						}
					})
				}

				return prisma.timelineEvent.update({
					where: {
						id: lastEvent.id
					},
					data: {
						event: {
							...lastEvent.event,
							newValue: event.event.newValue
						}
					}
				})
			}
		}

		return prisma.timelineEvent.create({
			data: {
				...event,
				event: event.event as Prisma.InputJsonValue
			}
		})
	}
}
