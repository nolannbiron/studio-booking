import type { TGetTasksCountRequest } from '@repo/schemas/task'

export interface ITaskKeys {
	scope: 'tasks'
	entity?: 'list' | 'contact' | 'count' | 'detail'
	contactId?: string
}

type ITaskKeysMapper = {
	all: ReadonlyArray<ITaskKeys>
	lists: () => ReadonlyArray<ITaskKeys>
	list: (_: TGetTasksCountRequest['Querystring']) => ReadonlyArray<ITaskKeys>
	count: (_: TGetTasksCountRequest['Querystring']) => ReadonlyArray<ITaskKeys>
	counts: () => ReadonlyArray<ITaskKeys>
	contact: (contactId?: string) => ReadonlyArray<ITaskKeys>
	detail: (taskId?: string) => ReadonlyArray<ITaskKeys>
}

export const taskKeys: ITaskKeysMapper = {
	all: [{ scope: 'tasks' }] as const,
	lists: () => [{ ...taskKeys.all[0], entity: 'list' }] as const,
	list: ({ teamId, creatorId, entityId }) =>
		[{ ...taskKeys.lists()[0], teamId, creatorId, entityId }] as const,
	counts: () => [{ ...taskKeys.all[0], entity: 'count' }] as const,
	count: ({ teamId, creatorId, entityId }) =>
		[{ ...taskKeys.counts()[0], teamId, creatorId, entityId }] as const,
	contact: (contactId) => [{ ...taskKeys.all[0], entity: 'contact', contactId }] as const,
	detail: (taskId) => [{ ...taskKeys.all[0], entity: 'detail', taskId }] as const
}
