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
		return prisma.timelineEvent.create({
			data: {
				...event,
				event: event.event as Prisma.InputJsonValue
			}
		})
	}
}
