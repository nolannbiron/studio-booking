import type { RowSelectionState, Updater } from '@tanstack/react-table'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type TContactsTableFooterType = 'sumFilled' | 'sumEmpty' | 'averageFilled' | 'averageEmpty' | undefined

type TContactsTableStore = {
	selectedCell: string
	setSelectedCell: (cell: string) => void

	rowSelection: RowSelectionState
	setRowSelection: (state: Updater<RowSelectionState>) => void

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
			setSelectedCell: (selectedCell) => set({ selectedCell }),
			rowSelection: {},
			setRowSelection: (rowSelection) => {
				if (typeof rowSelection === 'function') {
					set((state) => {
						const updatedRowSelection = rowSelection(state.rowSelection)
						return { rowSelection: updatedRowSelection }
					})
					return
				}

				set({ rowSelection: rowSelection })
			}
		}),
		{
			name: 'contacts-table-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
