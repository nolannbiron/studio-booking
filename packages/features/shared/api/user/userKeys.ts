export interface IUserKeys {
	scope: 'users'
	entity?: 'list' | 'detail'
	userId?: string
}

type IUserKeysMapper = {
	all: ReadonlyArray<IUserKeys>
	list: () => ReadonlyArray<IUserKeys>
	details: () => ReadonlyArray<IUserKeys>
	detail: (userId?: string) => ReadonlyArray<IUserKeys>
}

export const userKeys: IUserKeysMapper = {
	all: [{ scope: 'users' }] as const,
	list: () => [{ ...userKeys.all[0], entity: 'list' }] as const,
	details: () => [{ ...userKeys.all[0], entity: 'detail' }] as const,
	detail: (userId?: string) => [{ ...userKeys.details()[0], userId }] as const
}
