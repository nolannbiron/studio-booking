import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type TContactsTableFooterType = 'sumFilled' | 'sumEmpty' | 'averageFilled' | 'averageEmpty' | undefined

type TContactsTableStore = {
	selectedCell: string
	setSelectedCell: (cell: string) => void
	footer: {
		[key: string]: TContactsTableFooterType
	}
	setFooter: (footer: TContactsTableStore['footer']) => void
}

export const useContactsTableStore = create<TContactsTableStore>()(
	persist(
		(set) => ({
			footer: {},
			setFooter: (footer) => set({ footer }),
			selectedCell: '',
			setSelectedCell: (selectedCell) => set({ selectedCell })
		}),
		{
			name: 'contacts-table-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
