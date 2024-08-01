import type { TPrivateUser } from '@repo/schemas/user'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type User = Partial<TPrivateUser>

interface UserState {
	currentUser: TPrivateUser
	setCurrentUser: (user: User) => void
}

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			currentUser: {} as TPrivateUser,
			setCurrentUser: (user) => set({ currentUser: user as TPrivateUser })
		}),
		{
			name: 'user-storage', // name of item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage) // (optional) by default the 'localStorage' is used
		}
	)
)
