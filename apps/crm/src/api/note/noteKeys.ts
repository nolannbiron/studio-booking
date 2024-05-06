import type { TGetNotesCountRequest } from '@repo/schemas/note'

export interface INoteKeys {
	scope: 'notes'
	entity?: 'list' | 'contact' | 'count' | 'detail'
	contactId?: string
}

type INoteKeysMapper = {
	all: ReadonlyArray<INoteKeys>
	lists: () => ReadonlyArray<INoteKeys>
	list: (_: TGetNotesCountRequest['Querystring']) => ReadonlyArray<INoteKeys>
	count: (_: TGetNotesCountRequest['Querystring']) => ReadonlyArray<INoteKeys>
	counts: () => ReadonlyArray<INoteKeys>
	contact: (contactId?: string) => ReadonlyArray<INoteKeys>
	detail: ({ noteId, teamId }: { noteId?: string; teamId?: string }) => ReadonlyArray<INoteKeys>
}

export const noteKeys: INoteKeysMapper = {
	all: [{ scope: 'notes' }] as const,
	lists: () => [{ ...noteKeys.all[0], entity: 'list' }] as const,
	list: ({ teamId, creatorId, entityId }) =>
		[{ ...noteKeys.lists()[0], teamId, creatorId, entityId }] as const,
	counts: () => [{ ...noteKeys.all[0], entity: 'count' }] as const,
	count: ({ teamId, creatorId, entityId }) =>
		[{ ...noteKeys.counts()[0], teamId, creatorId, entityId }] as const,
	contact: (contactId) => [{ ...noteKeys.all[0], entity: 'contact', contactId }] as const,
	detail: ({ noteId, teamId }) => [{ ...noteKeys.all[0], entity: 'detail', noteId, teamId }] as const
}
