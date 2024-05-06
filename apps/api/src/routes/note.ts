import { NoteRepository } from '@repo/lib/server/repository/note'
import type {
	TCreateNoteRequest,
	TGetNoteRequest,
	TGetNotesCountRequest,
	TGetNotesRequest,
	TUpdateNoteRequest
} from '@repo/schemas/note'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

const noteRoutes = (app: FastifyInstance, options: FastifyPluginOptions, done: () => void) => {
	app.route<TGetNotesRequest>({
		method: 'GET',
		url: '/notes',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const notes = await NoteRepository.getNotes(req)

				return res.send({ success: true, notes }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TGetNoteRequest>({
		method: 'GET',
		url: '/note/:noteId',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const note = await NoteRepository.getNote(req)

				return res.send({ success: true, note }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TGetNotesCountRequest>({
		method: 'GET',
		url: '/notes-count',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const total = await NoteRepository.getNotesCount(req)

				return res.send({ success: true, total }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TCreateNoteRequest>({
		method: 'POST',
		url: '/note',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const note = await NoteRepository.create(req)

				return res.send({ success: true, note }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TUpdateNoteRequest>({
		method: 'PATCH',
		url: '/note/:noteId',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const note = await NoteRepository.update(req)

				return res.send({ success: true, note }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	done()
}

export default noteRoutes
