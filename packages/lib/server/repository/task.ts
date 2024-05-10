import { prisma, userPublicProfileSelect } from '@repo/prisma'
import type { Task } from '@repo/prisma/client'
import type {
	TCreateTaskRequest,
	TDeleteTaskRequest,
	TGetTaskRequest,
	TGetTasksCountRequest,
	TGetTasksRequest,
	TGroupedTasks,
	TTaskSchema,
	TUpdateTaskRequest
} from '@repo/schemas/task'
import type { TPrivateUser } from '@repo/schemas/user'
import type { FastifyRequest } from 'fastify'

export class TaskRepository {
	static #canAccessTask(task: Task & { assignees: { id: string }[] }, currentUser: TPrivateUser): boolean {
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

		const entity = await task.getEntity()

		return { ...task, entity } as TTaskSchema
	}

	static async getTasks(req: FastifyRequest<TGetTasksRequest>): Promise<TGroupedTasks> {
		// get Task with no due date, due date in the future, due date in the past, and completed tasks
		const [todayTasks, futureDueDateTasks, completedTasks, noDueDateTasks] = await prisma.$transaction([
			prisma.task.findMany({
				where: {
					creatorId: req.query.creatorId ? req.query.creatorId : undefined,
					teamId: req.query.teamId,
					entityId: req.query.entityId ? req.query.entityId : undefined,
					completed: { not: true },
					dueDate: {
						lte: new Date(new Date().setHours(23, 59, 59, 999))
					}
				},
				include: {
					assignees: {
						select: userPublicProfileSelect
					}
				},
				orderBy: {
					dueDate: 'asc'
				}
			}),
			prisma.task.findMany({
				where: {
					creatorId: req.query.creatorId ? req.query.creatorId : undefined,
					teamId: req.query.teamId,
					entityId: req.query.entityId ? req.query.entityId : undefined,
					completed: { not: true },
					dueDate: {
						gt: new Date(new Date().setHours(23, 59, 59, 999))
					}
				},
				include: {
					assignees: {
						select: userPublicProfileSelect
					}
				},
				orderBy: {
					dueDate: 'asc'
				}
			}),
			prisma.task.findMany({
				where: {
					creatorId: req.query.creatorId ? req.query.creatorId : undefined,
					teamId: req.query.teamId,
					entityId: req.query.entityId ? req.query.entityId : undefined,
					completed: { equals: true }
				},
				include: {
					assignees: {
						select: userPublicProfileSelect
					}
				},
				orderBy: {
					dueDate: 'asc'
				}
			}),
			prisma.task.findMany({
				where: {
					creatorId: req.query.creatorId ? req.query.creatorId : undefined,
					teamId: req.query.teamId,
					entityId: req.query.entityId ? req.query.entityId : undefined,
					dueDate: null,
					completed: { not: true }
				},
				include: {
					assignees: {
						select: userPublicProfileSelect
					}
				},
				orderBy: {
					dueDate: 'asc'
				}
			})
		])

		const tasksWithEntity = await Promise.all(
			[todayTasks, futureDueDateTasks, completedTasks, noDueDateTasks].map(async (tasks) => {
				return Promise.all(
					tasks.map(async (task) => {
						const entity = await task.getEntity()
						return { ...task, entity } as TTaskSchema
					})
				)
			})
		)

		return {
			today: tasksWithEntity[0],
			future: tasksWithEntity[1],
			completed: tasksWithEntity[2],
			noDueDate: tasksWithEntity[3]
		}
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
		const { assignees, ...body } = req.body

		const newTask = await prisma.task.create({
			data: {
				...body,
				creatorId: req.user!.id,
				dueDate: new Date(),
				...(assignees?.length
					? {
							assignees: {
								connect: assignees.map((assignee) => ({ id: assignee })) || []
							}
						}
					: {})
			},
			include: {
				assignees: {
					select: userPublicProfileSelect
				}
			}
		})

		return { ...newTask, entity: await newTask.getEntity() } as TTaskSchema
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

		const { assignees, ...body } = req.body

		const updatedTask = await prisma.task.update({
			where: {
				id: req.params.taskId
			},
			data: {
				...body,
				completed: typeof req.body.completed === 'boolean' ? req.body.completed : undefined,
				...(typeof assignees !== 'undefined' && assignees
					? {
							assignees: {
								disconnect: task.assignees.map((assignee) => ({ id: assignee.id })),
								connect: assignees.map((assignee) => ({ id: assignee })) || []
							}
						}
					: {})
			},
			include: {
				assignees: {
					select: userPublicProfileSelect
				}
			}
		})

		return { ...updatedTask, entity: await updatedTask.getEntity() } as TTaskSchema
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
