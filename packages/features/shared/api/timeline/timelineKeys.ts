export interface ITimelineKeys {
	scope: 'timeline'
	entity?: 'contact'
	contactId?: string
}

type ITimelineKeysMapper = {
	all: ReadonlyArray<ITimelineKeys>
	contact: (contactId?: string) => ReadonlyArray<ITimelineKeys>
}

export const timelineKeys: ITimelineKeysMapper = {
	all: [{ scope: 'timeline' }] as const,
	contact: (contactId) => [{ ...timelineKeys.all[0], entity: 'contact', contactId }] as const
}
