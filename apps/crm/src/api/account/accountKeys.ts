export interface IAccountKeys {
	scope: 'account'
}

type IAccountKeysMapper = {
	me: ReadonlyArray<IAccountKeys>
}

export const accountKeys: IAccountKeysMapper = {
	me: [{ scope: 'account' }] as const
}
