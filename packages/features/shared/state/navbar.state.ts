import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export enum NavbarSize {
	SM = 0,
	MD = 200,
	LG = 250,
	XL = 320
}

interface NavbarState {
	width: number
	setWidth: (width: number) => void
}

export const useNavbarStore = create<NavbarState>()(
	persist(
		(set) => ({
			width: NavbarSize.LG,
			setWidth: (width) => {
				if (width < NavbarSize.MD && width >= NavbarSize.SM) {
					// isNavbarOpen = false
					width = NavbarSize.SM
				}

				set({
					width: width
				})
			}
		}),
		{
			name: 'navbar-storage', // name of item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage) // (optional) by default the 'localStorage' is used
		}
	)
)
