import type { TGetNotesCountRequest } from '@repo/schemas/note'

export interface INoteKeys {
	scope: 'notes'
	entity?: 'list' | 'contact' | 'count' | 'detail'
	contactId?: string
}

type INoteKeysMapper = {
	all: ReadonlyArray<INoteKeys>
	list: (_: TGetNotesCountRequest['Querystring']) => ReadonlyArray<INoteKeys>
	count: (_: TGetNotesCountRequest['Querystring']) => ReadonlyArray<INoteKeys>
	contact: (contactId?: string) => ReadonlyArray<INoteKeys>
	detail: ({ noteId, teamId }: { noteId?: string; teamId?: string }) => ReadonlyArray<INoteKeys>
}

export const noteKeys: INoteKeysMapper = {
	all: [{ scope: 'notes' }] as const,
	list: ({ teamId, creatorId, entityId }) =>
		[{ ...noteKeys.all[0], entity: 'list', teamId, creatorId, entityId }] as const,
	count: ({ teamId, creatorId, entityId }) =>
		[{ ...noteKeys.all[0], entity: 'count', teamId, creatorId, entityId }] as const,
	contact: (contactId) => [{ ...noteKeys.all[0], entity: 'contact', contactId }] as const,
	detail: ({ noteId, teamId }) => [{ ...noteKeys.all[0], entity: 'detail', noteId, teamId }] as const
}
