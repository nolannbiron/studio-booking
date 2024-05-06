import { prisma, userPublicProfileSelect } from '@repo/prisma'
import type { Task } from '@repo/prisma/client'
import type {
	TCreateTaskRequest,
	TDeleteTaskRequest,
	TGetTaskRequest,
	TGetTasksCountRequest,
	TGetTasksRequest,
	TTaskSchema,
	TUpdateTaskRequest
} from '@repo/schemas/task'
import type { TPrivateUser, TPublicUser } from '@repo/schemas/user'
import type { FastifyRequest } from 'fastify'

export class TaskRepository {
	static #canAccessTask(task: Task & { assignees: TPublicUser[] }, currentUser: TPrivateUser): boolean {
		return (
			task.creatorId === currentUser.id ||
			currentUser.teams.some((team) => team.id === task.teamId) ||
			task.assignees.some((assignee) => assignee.id === currentUser.id)
		)
	}

	static async getTask(req: FastifyRequest<TGetTaskRequest>): Promise<TTaskSchema> {
		const task = await prisma.task.findFirst({
			where: {
				id: req.params.taskId
			},
			include: {
				assignees: {
					select: userPublicProfileSelect
				}
			}
		})

		if (!task) {
			throw 'Task not found'
		}

		if (!this.#canAccessTask(task, req.user!)) {
			throw 'Unauthorized access to task'
		}

		return task
	}

	static async getTasks(req: FastifyRequest<TGetTasksRequest>): Promise<TTaskSchema[]> {
		const tasks = await prisma.task.findMany({
			where: {
				creatorId: req.query.creatorId ? req.query.creatorId : undefined,
				teamId: req.query.teamId,
				entityId: req.query.entityId ? req.query.entityId : undefined
			},
			include: {
				assignees: {
					select: userPublicProfileSelect
				}
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		return tasks
	}

	static async getTasksCount(req: FastifyRequest<TGetTasksCountRequest>) {
		const total = await prisma.task.count({
			where: {
				creatorId: req.query.creatorId ? req.query.creatorId : undefined,
				teamId: req.query.teamId,
				entityId: req.query.entityId ? req.query.entityId : undefined
			}
		})

		return total
	}

	static async create(req: FastifyRequest<TCreateTaskRequest>): Promise<TTaskSchema> {
		const newTask = await prisma.task.create({
			data: {
				...req.body,
				assignees: {
					connect: {
						id: req.user!.id
					}
				},
				creatorId: req.user!.id
			},
			include: {
				assignees: {
					select: userPublicProfileSelect
				}
			}
		})

		return newTask
	}

	static async update(req: FastifyRequest<TUpdateTaskRequest>): Promise<TTaskSchema> {
		const task = await prisma.task.findFirst({
			where: {
				id: req.params.taskId
			},
			include: {
				assignees: {
					select: userPublicProfileSelect
				}
			}
		})

		if (!task) {
			throw 'Task not found'
		}

		if (!this.#canAccessTask(task, req.user!)) {
			throw 'Unauthorized access to task'
		}

		const updatedTask = await prisma.task.update({
			where: {
				id: req.params.taskId
			},
			data: {
				...req.body
			},
			include: {
				assignees: {
					select: userPublicProfileSelect
				}
			}
		})

		return updatedTask
	}

	static async delete(req: FastifyRequest<TDeleteTaskRequest>): Promise<boolean> {
		const task = await prisma.task.findFirst({
			where: {
				id: req.params.taskId
			},
			include: {
				assignees: {
					select: userPublicProfileSelect
				}
			}
		})

		if (!task) {
			throw 'Task not found'
		}

		if (!this.#canAccessTask(task, req.user!)) {
			throw 'Unauthorized access to task'
		}

		if (
			task.creatorId !== req.user!.id &&
			req.user?.teams.find((team) => team.id === task.teamId)?.role !== 'OWNER'
		) {
			throw 'Only the creator can delete the task'
		}

		await prisma.task.delete({
			where: {
				id: req.params.taskId
			}
		})

		return true
	}
}
