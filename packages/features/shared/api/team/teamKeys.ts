export interface ITeamKeys {
	scope: 'teams'
	entity?: 'list' | 'detail' | 'users'
	teamId?: string
}

type ITeamKeysMapper = {
	all: ReadonlyArray<ITeamKeys>
	list: () => ReadonlyArray<ITeamKeys>
	details: () => ReadonlyArray<ITeamKeys>
	detail: (teamId?: string) => ReadonlyArray<ITeamKeys>
	users: (teamId?: string) => ReadonlyArray<ITeamKeys>
}

export const teamKeys: ITeamKeysMapper = {
	all: [{ scope: 'teams' }] as const,
	list: () => [{ ...teamKeys.all[0], entity: 'list' }] as const,
	details: () => [{ ...teamKeys.all[0], entity: 'detail' }] as const,
	detail: (teamId?: string) => [{ ...teamKeys.details()[0], teamId }] as const,
	users: (teamId) => [{ ...teamKeys.all[0], entity: 'users', teamId }] as const
}
