import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@repo/ui/dropdown-menu'
import { TooltipProvider } from '@repo/ui/tooltip'
import { type Editor } from '@tiptap/react'
import { type ComponentProps } from 'react'
import { BsChevronExpand } from 'react-icons/bs'

import BubbleMenuDropdownItem from './BubbleMenuDropdownItem'
import { commandsItems } from './commands/commands-items'

interface Props extends ComponentProps<typeof DropdownMenu> {
	children?: React.ReactNode
	editor: Editor
}

export default function BubbleMenuDropdown({ editor, open, onOpenChange }: Props): JSX.Element {
	return (
		<DropdownMenu open={open} onOpenChange={onOpenChange}>
			<DropdownMenuTrigger className="hover:bg-accent border-input focus:ring-ring flex w-32 items-center justify-start overflow-visible rounded-md rounded-r-none border-r px-3 text-sm shadow-none focus:outline-none focus:ring-1">
				<div className="flex w-full items-center justify-between">
					{editor.isActive('heading')
						? `Heading ${editor.getAttributes('heading').level}`
						: editor.isActive('bulletList')
							? 'Bulleted list'
							: editor.isActive('orderedList')
								? 'Ordered list'
								: editor.isActive('paragraph')
									? 'Text'
									: 'Turn into'}
					<BsChevronExpand className="ml-1 h-4 w-4" />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="bottom" align="start" className="w-44">
				<TooltipProvider>
					<DropdownMenuGroup>
						{Object.values(commandsItems).map((items, i) => (
							<div key={`DropdownMenuGroup-${items.length}-${i}`} className="flex flex-col">
								{items.map((item, i) => (
									<BubbleMenuDropdownItem
										key={item.title + i}
										icon={item.icon}
										tooltipImage={item.tooltip.image}
										tooltip={item.tooltip.text}
										onClick={() => {
											item.command({ editor, range: editor.state.selection })
											onOpenChange?.(false)
										}}
									>
										{item.title}
									</BubbleMenuDropdownItem>
								))}
								{Object.values(commandsItems).length > 1 && <DropdownMenuSeparator />}
							</div>
						))}
					</DropdownMenuGroup>
				</TooltipProvider>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
