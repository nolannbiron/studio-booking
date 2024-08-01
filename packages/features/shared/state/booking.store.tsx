import type { TBookingGroupName } from '@repo/schemas/booking'
import type { TBookingFilters } from '@repo/schemas/filters/booking-filters.schema'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type TBookingTabsStore = {
	active: TBookingGroupName
}

type TBookingStore = {
	tabs: TBookingTabsStore
	filters: {
		active: TBookingFilters
	}
	collapsedGroups: Record<TBookingGroupName, Array<string>>
	setFilters: (filters: TBookingFilters) => void
	resetFilters: () => void
	setTabs: (active: TBookingGroupName) => void
	setCollapsedGroups: (group: TBookingGroupName, ids: Array<string>) => void
}

const defaultFilters: TBookingFilters = {
	sortBy: undefined,
	search: undefined
}

export const useBookingStore = create<TBookingStore>()(
	persist(
		(set) => ({
			tabs: {
				active: 'today'
			},
			filters: {
				active: defaultFilters
			},
			collapsedGroups: {
				today: [],
				upcoming: [],
				past: [],
				canceled: []
			},
			setTabs: (active) => set({ tabs: { active } }),
			setFilters: (active) => set({ filters: { active } }),
			resetFilters: () => set({ filters: { active: defaultFilters } }),
			setCollapsedGroups: (group, ids) =>
				set((state) => ({
					collapsedGroups: {
						...state.collapsedGroups,
						[group]: ids
					}
				}))
		}),
		{
			name: 'booking-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
