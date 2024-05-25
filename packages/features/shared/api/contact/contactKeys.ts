import type { TContactFilters } from '@repo/schemas/filters/contact-filters.schema'

export interface IContactKeys {
	scope: 'contacts'
	entity?: 'lists' | 'detail'
	contactId?: string
}

type IContactKeysMapper = {
	all: ReadonlyArray<IContactKeys>
	lists: () => ReadonlyArray<IContactKeys>
	list: ({
		teamId,
		filters
	}: {
		teamId?: string
		filters?: TContactFilters | null
	}) => ReadonlyArray<IContactKeys>
	details: () => ReadonlyArray<IContactKeys>
	detail: ({ contactId, teamId }: { contactId?: string; teamId?: string }) => ReadonlyArray<IContactKeys>
}

export const contactKeys: IContactKeysMapper = {
	all: [{ scope: 'contacts' }] as const,
	lists: () => [{ ...contactKeys.all[0], entity: 'lists' }] as const,
	list: ({ teamId, filters }) => [{ ...contactKeys.lists()[0], teamId, ...(filters ?? {}) }] as const,
	details: () => [{ ...contactKeys.all[0], entity: 'detail' }] as const,
	detail: ({ contactId, teamId }) => [{ ...contactKeys.details()[0], contactId, teamId }] as const
}
