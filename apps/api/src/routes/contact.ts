import { ContactRepository } from '@repo/lib/server/repository/contact'
import type { TDeleteContactRequest, TGetContactRequest, TGetContactsRequest } from '@repo/schemas/contact'
import {
	type TCreateContactRequest,
	type TUpdateContactRequest,
	ZCreateContactSchema,
	ZUpdateContactSchema
} from '@repo/schemas/contact'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

const contactRoutes = (app: FastifyInstance, options: FastifyPluginOptions, done: () => void) => {
	app.route<TGetContactsRequest>({
		method: 'GET',
		url: '/team/:teamId/contacts',
		preHandler: app.Auth.TeamUser,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const contacts = await ContactRepository.getAll(req)

				return res.send({ success: true, contacts }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TGetContactRequest>({
		method: 'GET',
		url: '/team/:teamId/contact/:id',
		preHandler: app.Auth.TeamUser,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const contact = await ContactRepository.getOne(req)

				return res.send({ success: true, contact }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TCreateContactRequest>({
		method: 'POST',
		url: '/team/:teamId/contact',
		schema: {
			body: ZCreateContactSchema
		},
		preHandler: app.Auth.TeamUser,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const contact = await ContactRepository.createContact(req)

				return res.send({ success: true, contact }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TUpdateContactRequest>({
		method: 'PATCH',
		url: '/team/:teamId/contact/:id',
		preHandler: app.Auth.TeamUser,
		schema: {
			body: ZUpdateContactSchema
		},
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const contact = await ContactRepository.update(req)

				return res.send({ success: true, contact }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TDeleteContactRequest>({
		method: 'DELETE',
		url: '/team/:teamId/contact/:id',
		preHandler: app.Auth.TeamUser,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				await ContactRepository.remove(req)

				return res.send({ success: true }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	done()
}

export default contactRoutes
