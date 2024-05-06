import { z } from 'zod'

import { ZPublicUserSchema } from '../user'

// id        String    @id @default(uuid())
//     title     String
//     dueDate   DateTime?
//     completed Boolean   @default(false)

//     entityId   String?
//     entityType String?

//     creatorId String?

//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt

//     team   Team   @relation(fields: [teamId], references: [id], onDelete: Cascade)
//     teamId String

//     assignees User[]

export const ZTaskSchema = z.object({
	id: z.string(),
	title: z.string(),
	dueDate: z.date().nullish(),
	completed: z.boolean().default(false),
	entityId: z.string().nullish(),
	entityType: z.string().nullish(),
	creatorId: z.string().nullish(),
	teamId: z.string(),
	assignees: z.lazy(() => z.array(ZPublicUserSchema)),
	createdAt: z.date(),
	updatedAt: z.date()
})

export const ZTaskCreateSchema = ZTaskSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	creator: true,
	assignees: true
})
export const ZTaskUpdateSchema = ZTaskSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	creator: true,
	creatorId: true,
	teamId: true,
	assignees: true
}).partial()

export type TTaskSchema = z.infer<typeof ZTaskSchema>
export type TTaskCreateSchema = z.infer<typeof ZTaskCreateSchema>
export type TTaskUpdateSchema = z.infer<typeof ZTaskUpdateSchema>

export type TTasksReply = {
	success: true
	tasks: TTaskSchema[]
}

export type TTaskReply = {
	success: true
	task: TTaskSchema
}

export type TGetTaskRequest = {
	Querystring: {
		creatorId?: string
		entityId?: string
		teamId: string
	}
	Params: { taskId: string }
	Reply: TTaskReply | { success: false; message: unknown }
}

export type TGetTasksRequest = {
	Querystring: {
		creatorId?: string
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
		creatorId?: string
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
