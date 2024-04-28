'use client'

import type { TTeam } from '@repo/schemas/team'
import type { ReactNode } from 'react'
import { useContext, useEffect, useRef } from 'react'
import { createContext } from 'react'
import type { StoreApi } from 'zustand'
import { createStore, useStore } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const TEAM_STORAGE_KEY = 'team:storage'
interface TeamState {
	team?: TTeam
	teams: TTeam[]
}

type TeamActions = {
	setTeam: (team?: TTeam) => void
	setTeams: (teams?: TTeam[]) => void
}

export type TeamStore = TeamState & TeamActions

export const defaultInitState: TeamState = {
	team: undefined,
	teams: []
}

export const initTeamStore = (state: TeamState): TeamState => {
	return state
}

export const createTeamStore = (initState: TeamState = defaultInitState) => {
	return createStore<TeamStore>()(
		persist(
			(set) => ({
				...initState,
				setTeam: (team) => set({ team }),
				setTeams: (teams) => set({ teams })
			}),
			{
				name: TEAM_STORAGE_KEY,
				storage: createJSONStorage(() => localStorage)
			}
		)
	)
}

export interface TeamStoreProviderProps {
	children: ReactNode
	team?: TTeam
	teams?: TTeam[]
}

export const TeamStoreProvider = ({ children, team, teams = [] }: TeamStoreProviderProps) => {
	const storeRef = useRef<StoreApi<TeamStore>>()

	if (!storeRef.current) {
		storeRef.current = createTeamStore(initTeamStore({ team, teams }))
	}

	//if team or teams changes
	useEffect(() => {
		storeRef.current?.setState({ team, teams })
	}, [team, teams])

	return (
		<>
			{/* <style>
				{`
					:root, .dark {
						--primary: ${team?.color};
					}
				`}
			</style> */}
			<TeamStoreContext.Provider value={storeRef.current}>{children}</TeamStoreContext.Provider>
		</>
	)
}

export const TeamStoreContext = createContext<StoreApi<TeamStore> | null>(null)

export function useTeamStore(): TeamStore {
	const teamStoreContext = useContext(TeamStoreContext)

	if (!teamStoreContext) {
		throw new Error(`useTeamStore must be use within TeamStoreProvider`)
	}

	return useStore(teamStoreContext)
}

export function useGetLocalTeam(): TTeam | undefined {
	if (typeof window === 'undefined') return undefined
	const teamStorage = localStorage.getItem(TEAM_STORAGE_KEY)

	return !!teamStorage ? JSON.parse(teamStorage).state.team : undefined
}

// merge the team with the existing state
export function setLocalTeam(team?: TTeam): void {
	localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify({ state: { team } }))
}
