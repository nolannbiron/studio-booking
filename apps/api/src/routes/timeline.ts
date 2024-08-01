import { TimelineRepository } from '@repo/lib/server/repository/timeline'
import type { TGetTimelineEventsContact } from '@repo/schemas/timeline'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

const timelineRoutes = (app: FastifyInstance, options: FastifyPluginOptions, done: () => void) => {
	app.route<TGetTimelineEventsContact>({
		method: 'GET',
		url: '/contact/:contactId/timeline',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const events = await TimelineRepository.getTimelineEventsContact(req)

				return res.send({ success: true, events }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	done()
}

export default timelineRoutes
