import { useContactsTableStore } from '@/components/contacts/table/store/contacts-table.store'
import { cn } from '@repo/ui/lib/utils'
import { type PropsWithChildren, useEffect, useMemo, useRef } from 'react'

export default function TableSelectableCell({
	children,
	isExpandable,
	cellId,
	onActive
}: PropsWithChildren<{
	isExpandable?: boolean
	cellId: string
	onActive?: (isOpen: boolean) => void
	onDelete?: () => void
}>): JSX.Element {
	const ref = useRef<HTMLDivElement>(null)
	const { selectedCell, setSelectedCell } = useContactsTableStore()

	const isActivated = useMemo(() => selectedCell === cellId, [selectedCell, cellId])

	useEffect(() => {
		if (!isActivated) {
			onActive?.(false)
		}
	}, [isActivated, isExpandable, onActive])

	// useIsOutsideClick(ref, () => {
	// 	if (!isActivated) return

	// 	setSelectedCell('')
	// 	onActive?.(false)
	// })

	const handleClick = () => {
		if (!isActivated) {
			setSelectedCell(cellId)
		}

		isExpandable && onActive?.(false)
	}

	return (
		<div
			ref={ref}
			className={cn('relative h-full w-full pr-px', {
				'absolute left-0 top-0': isExpandable && isActivated
			})}
			onDoubleClick={() => onActive?.(true)}
		>
			<div
				onClick={handleClick}
				className={cn('grid h-full select-none flex-nowrap items-center gap-1', {
					'bg-background absolute left-0 top-0 z-20 h-max max-h-[200px] min-h-full w-max min-w-full max-w-[300px] rounded [&>button]:flex-wrap':
						isExpandable && isActivated,
					'before:border-primary before:bg-primary/10 before:pointer-events-none before:absolute before:-right-0 before:-top-px before:bottom-0 before:left-0 before:z-10 before:overflow-hidden before:rounded before:border before:transition-all':
						isActivated
				})}
			>
				{children}
			</div>
		</div>
	)
}
