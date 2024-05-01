import { useContactsTableStore } from '@/components/contacts/table/store/contacts-table.store'
import { useIsOutsideClick } from '@repo/hooks'
import { cn } from '@repo/ui/lib/utils'
import { type PropsWithChildren, useEffect, useMemo, useRef } from 'react'

export default function TableSelectableCell({
	children,
	isExpandable,
	cellId,
	onOpenPopoverChange
}: PropsWithChildren<{
	isExpandable?: boolean
	cellId: string
	onOpenPopoverChange?: (isOpen: boolean) => void
	onDelete?: () => void
}>): JSX.Element {
	const ref = useRef<HTMLDivElement>(null)
	const { selectedCell, setSelectedCell } = useContactsTableStore()

	const isActivated = useMemo(() => selectedCell === cellId, [selectedCell, cellId])

	useEffect(() => {
		if (!isActivated) {
			onOpenPopoverChange?.(false)
		}
	}, [isActivated, isExpandable, onOpenPopoverChange])

	useIsOutsideClick(ref, () => {
		if (!isActivated) return

		setSelectedCell('')
		onOpenPopoverChange?.(false)
	})

	const handleClick = () => {
		if (!isActivated) {
			setSelectedCell(cellId)
		}

		onOpenPopoverChange?.(false)
	}

	return (
		<div
			ref={ref}
			className={cn('relative h-full', {
				'absolute left-0 top-0 h-fit max-h-[200px] min-h-full w-full min-w-full max-w-[300px]':
					isExpandable && isActivated
			})}
			onDoubleClick={() => onOpenPopoverChange?.(true)}
		>
			<div
				onClick={handleClick}
				className={cn('flex h-full w-full select-none flex-nowrap items-center gap-1', {
					'bg-background absolute left-0 top-0 z-40 h-fit max-h-[200px] min-h-full min-w-full max-w-[300px] rounded py-2 [&>div]:flex-wrap':
						isExpandable && isActivated,
					'before:border-primary before:bg-primary/10 before:pointer-events-none before:absolute before:-right-0 before:-top-px before:bottom-0 before:left-0 before:z-20 before:overflow-hidden before:rounded before:border before:transition-all':
						isActivated
				})}
			>
				{children}
			</div>
		</div>
	)
}
