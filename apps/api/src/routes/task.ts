import { TaskRepository } from '@repo/lib/server/repository/task'
import type {
	TCreateTaskRequest,
	TDeleteTaskRequest,
	TGetTaskRequest,
	TGetTasksCountRequest,
	TGetTasksRequest,
	TUpdateTaskRequest
} from '@repo/schemas/task'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

const taskRoutes = (app: FastifyInstance, options: FastifyPluginOptions, done: () => void) => {
	app.route<TGetTasksRequest>({
		method: 'GET',
		url: '/tasks',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const tasks = await TaskRepository.getTasks(req)

				return res.send({ success: true, tasks }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TGetTaskRequest>({
		method: 'GET',
		url: '/task/:taskId',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const task = await TaskRepository.getTask(req)

				return res.send({ success: true, task }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TGetTasksCountRequest>({
		method: 'GET',
		url: '/tasks-count',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const total = await TaskRepository.getTasksCount(req)

				return res.send({ success: true, total }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TCreateTaskRequest>({
		method: 'POST',
		url: '/task',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const task = await TaskRepository.create(req)

				return res.send({ success: true, task }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TUpdateTaskRequest>({
		method: 'PATCH',
		url: '/task/:taskId',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const task = await TaskRepository.update(req)

				return res.send({ success: true, task }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TDeleteTaskRequest>({
		method: 'DELETE',
		url: '/task/:taskId',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				await TaskRepository.delete(req)

				return res.send({ success: true }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	done()
}

export default taskRoutes
