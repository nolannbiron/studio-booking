import { type TBookingFilters } from '@repo/schemas/filters/booking-filters.schema'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const defaultFilters: TBookingFilters = {
	sortBy: undefined,
	search: undefined
}

type TBookingFiltersStore = {
	filters: TBookingFilters
	setFilters: (filters: TBookingFilters) => void
	resetFilters: () => void
}

export const useBookingsFiltersStore = create<TBookingFiltersStore>()(
	persist(
		(set) => ({
			filters: defaultFilters,
			setFilters: (filters) => set({ filters }),
			resetFilters: () => set({ filters: defaultFilters })
		}),
		{
			name: 'bookings-filters-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
