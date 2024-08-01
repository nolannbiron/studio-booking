import type { TPrivateUserReply } from '@repo/schemas/auth'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { useUserStore } from './user.state'

interface ConnectionData {
	token: string
	refreshToken: string
}

interface AuthState {
	isLoggedIn: boolean
	jwt?: ConnectionData
	login: (res: TPrivateUserReply) => void
	logout: () => void
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			isLoggedIn: false,
			jwt: {
				token: '',
				refreshToken: ''
			},
			login: (res) => {
				set({ jwt: { token: res.token, refreshToken: res.refreshToken }, isLoggedIn: true })
				useUserStore.setState({ currentUser: res.user })
			},
			logout: () => {
				set({ jwt: undefined, isLoggedIn: false })
				useUserStore.setState({ currentUser: undefined })
			}
		}),
		{
			name: 'auth-storage', // name of item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage) // (optional) by default the 'localStorage' is used,
		}
	)
)
