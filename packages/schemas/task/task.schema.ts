import { z } from 'zod'

import { ZContactSchema } from '../contact'
import { ZPublicUserSchema } from '../user'

// id        String    @id @default(uuid())
//     title     String
//     dueDate   DateTime?
//     completed Boolean   @default(false)

//     entityId   String?
//     entityType String?

//     ownerId String?

//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt

//     team   Team   @relation(fields: [teamId], references: [id], onDelete: Cascade)
//     teamId String

//     assignees User[]

export const ZTaskSchema = z.object({
	id: z.string(),
	title: z.string(),
	dueDate: z.date().nullish(),
	completed: z.boolean().nullish(),
	entityId: z.string().uuid().nullish(),
	entityType: z.string().nullish(),
	ownerId: z.string().nullish(),
	teamId: z.string(),
	assignees: z.lazy(() => z.array(ZPublicUserSchema)),
	entity: z.lazy(() => ZContactSchema).nullish(),
	createdAt: z.date(),
	updatedAt: z.date()
})

export const ZTaskCreateSchema = ZTaskSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	creator: true,
	assignees: true,
	completed: true
})
	.extend({
		assignees: z.array(z.string()).nullish()
	})
	.required({
		entityId: true
	})

export const ZTaskUpdateSchema = ZTaskSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	creator: true,
	ownerId: true,
	teamId: true,
	assignees: true
})
	.partial()
	.extend({
		assignees: z.array(z.string()).nullish()
	})

export type TTaskSchema = z.infer<typeof ZTaskSchema>
export type TTaskCreateSchema = z.infer<typeof ZTaskCreateSchema>
export type TTaskUpdateSchema = z.infer<typeof ZTaskUpdateSchema>

export type TTasksReply = {
	success: true
	tasks: TGroupedTasks
}

export type TTaskReply = {
	success: true
	task: TTaskSchema
}

export type TGetTaskRequest = {
	Querystring: {
		ownerId?: string
		entityId?: string
		teamId: string
	}
	Params: { taskId: string }
	Reply: TTaskReply | { success: false; message: unknown }
}

export type TGetTasksRequest = {
	Querystring: {
		ownerId?: string
		entityId?: string
		teamId: string
	}
	Reply: TTasksReply | { success: false; message: unknown }
}

export type TTasksCountReply = {
	success: true
	total: number
}

export type TGetTasksCountRequest = {
	Querystring: {
		ownerId?: string
		entityId?: string | null
		teamId: string
	}
	Reply: TTasksCountReply | { success: false; message: unknown }
}

export type TCreateTaskRequest = {
	Body: TTaskCreateSchema
	Reply: TTaskReply | { success: false; message: unknown }
}

export type TUpdateTaskRequest = {
	Body: TTaskUpdateSchema
	Params: { taskId: string }
	Reply: TTaskReply | { success: false; message: unknown }
}

export type TDeleteTaskRequest = {
	Params: { taskId: string }
	Reply: { success: true } | { success: false; message: unknown }
}

export type TTaskGroupName = 'today' | 'future' | 'completed' | 'noDueDate'

export type TGroupedTasks = {
	[key in TTaskGroupName]: TTaskSchema[]
}
