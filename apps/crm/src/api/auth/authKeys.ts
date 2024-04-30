export interface IAuthKeys {
	scope: 'auth'
	entity?: 'csrfToken'
}

type IAuthKeysMapper = {
	all: ReadonlyArray<IAuthKeys>
	csrfToken: () => ReadonlyArray<IAuthKeys>
}

export const authKeys: IAuthKeysMapper = {
	all: [{ scope: 'auth' }] as const,
	csrfToken: () => [{ ...authKeys.all[0], entity: 'csrfToken' }] as const
}
