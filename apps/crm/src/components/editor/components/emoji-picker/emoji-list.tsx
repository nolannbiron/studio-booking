import { cn } from '@repo/ui/lib/utils'
import { type SuggestionProps } from '@tiptap/suggestion'
import { type KeyboardEvent, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react'

export default forwardRef(function EmojiList(props: SuggestionProps, ref) {
	const [selectedIndex, setSelectedIndex] = useState(0)

	const selectItem = useCallback(
		(index: number) => {
			const item = props.items[index]

			if (item) {
				props.command({ name: item.name })
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
		<div className="bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-full min-w-[186px] rounded-md border p-2 shadow-md outline-none lg:min-w-[356px]">
			<div className={cn('grid w-full', !!props.items.length && 'grid-cols-6 lg:grid-cols-12')}>
				{!!props.items.length ? (
					props.items.map((item, index) => (
						<button
							className="hover:bg-accent focus:border-accent col-span-1 flex aspect-square h-7 w-7 items-center justify-center rounded-md border border-transparent focus:outline-none"
							key={index}
							onClick={() => selectItem(index)}
						>
							{item.fallbackImage ? <img src={item.fallbackImage} alt="emoji" /> : item.emoji}
						</button>
					))
				) : (
					<div className="text-muted-foreground col-span-full flex h-7 w-full items-center pl-1 text-xs">
						No results
					</div>
				)}
			</div>
		</div>
	)
})
