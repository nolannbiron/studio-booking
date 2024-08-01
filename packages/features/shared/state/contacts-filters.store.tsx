import { type TContactFilters } from '@repo/schemas/filters/contact-filters.schema'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const defaultFilters: TContactFilters = {
	sortBy: undefined,
	type: undefined,
	search: undefined
}

type TContactFiltersStore = {
	filters: TContactFilters
	setFilters: (filters: TContactFilters) => void
	resetFilters: () => void
}

export const useContactsFiltersStore = create<TContactFiltersStore>()(
	persist(
		(set) => ({
			filters: defaultFilters,
			setFilters: (filters) => set({ filters }),
			resetFilters: () => set({ filters: defaultFilters })
		}),
		{
			name: 'contacts-filters-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
