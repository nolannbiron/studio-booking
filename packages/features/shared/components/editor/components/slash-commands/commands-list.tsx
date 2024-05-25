import { DropdownMenuLabel } from '@repo/ui/dropdown-menu'
import { cn } from '@repo/ui/lib/utils'
import { TooltipProvider } from '@repo/ui/tooltip'
import { type SuggestionProps } from '@tiptap/suggestion'
import { type KeyboardEvent, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react'

import { type TSuggestionCommandItem } from './suggestion'

export default forwardRef(function CommandsList(props: SuggestionProps<TSuggestionCommandItem>, ref) {
	const [selectedIndex, setSelectedIndex] = useState(0)

	const selectItem = useCallback(
		(index: number) => {
			const item = props.items[index]

			if (item) {
				props.command(item)
			}
		},
		[props]
	)

	const upHandler = useCallback(() => {
		setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length)
	}, [props.items.length, selectedIndex])

	const downHandler = useCallback(() => {
		setSelectedIndex((selectedIndex + 1) % props.items.length)
	}, [props.items.length, selectedIndex])

	const enterHandler = useCallback(() => {
		selectItem(selectedIndex)
	}, [selectItem, selectedIndex])

	useEffect(() => setSelectedIndex(0), [props.items])

	useImperativeHandle(
		ref,
		() => {
			return {
				onKeyDown: (x: { event: { key: KeyboardEvent['key'] } }) => {
					if (x.event.key === 'ArrowUp') {
						upHandler()
						return true
					}

					if (x.event.key === 'ArrowDown') {
						downHandler()
						return true
					}

					if (x.event.key === 'Enter') {
						enterHandler()
						return true
					}

					return false
				}
			}
		},
		[upHandler, downHandler, enterHandler]
	)

	return (
		<TooltipProvider>
			<div className="bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-full min-w-[186px] rounded-md border p-2 shadow-md outline-none sm:min-w-[256px]">
				<div className={cn('flex w-full flex-col gap-1')}>
					{!!props.items.length ? (
						<>
							<DropdownMenuLabel className="text-muted-foreground pt-0 text-xs font-normal">
								Basic blocks
							</DropdownMenuLabel>
							{props.items.map((item, index) => (
								<item.Element
									key={item.title}
									title={item.title}
									onClick={() => selectItem(index)}
									selected={index === selectedIndex}
								/>
							))}
						</>
					) : (
						<div className="text-muted-foreground col-span-full flex h-7 w-full items-center pl-1 text-xs">
							No results
						</div>
					)}
				</div>
			</div>
		</TooltipProvider>
	)
})
