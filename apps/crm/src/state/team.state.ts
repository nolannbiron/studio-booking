import type { MembershipRole } from '@repo/prisma/enums'
import type { TTeam } from '@repo/schemas/team'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type TTeamWithRole = TTeam & { role: MembershipRole }

export type UpdatableTeam = Partial<TTeamWithRole>

interface TeamState {
	currentTeam: TTeamWithRole
	setCurrentTeam: (team?: UpdatableTeam) => void
	teams: TTeam[]
	setTeams: (teams: TTeam[]) => void
}

export const useTeamStore = create<TeamState>()(
	persist(
		(set) => ({
			currentTeam: {} as TTeamWithRole,
			setCurrentTeam: (team) => set({ currentTeam: team as TTeamWithRole }),
			teams: [],
			setTeams: (teams) => {
				set({ teams })
			}
		}),
		{
			name: 'team-storage', // name of item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage) // (optional) by default the 'localStorage' is used
		}
	)
)
