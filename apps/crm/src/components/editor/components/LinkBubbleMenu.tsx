import { Button } from '@repo/ui/button'
import { cn } from '@repo/ui/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/ui/tooltip'
import { type Editor } from '@tiptap/core'
import { BubbleMenu as BubbleMenuBase } from '@tiptap/react'
import { type MouseEvent } from 'react'
import { FiArrowUpRight, FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function LinkBubbleMenu({ editor }: { editor: Editor }): JSX.Element {
	const handleReset = (e: MouseEvent) => {
		e.preventDefault()
		editor.chain().focus().unsetLink().run()
	}

	return (
		<BubbleMenuBase
			editor={editor}
			tippyOptions={{
				placement: 'bottom',
				duration: 200,
				moveTransition: 'transform 0.2s ease-in-out'
			}}
			shouldShow={({ editor: e }) => e.isActive('link')}
			className={cn(
				'bg-popover text-popover-foreground animate-in fade-in-0 zoom-out-95 zoom-in-95 slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-input z-50 flex rounded-md border-y p-0 shadow-md outline-none'
			)}
		>
			<div className="border-input flex w-fit items-center justify-start rounded-none border-r px-2 py-1 text-sm shadow-none focus:outline-none focus:ring-0">
				<div className="flex w-full items-center justify-between gap-6">
					<div className="text-foreground/80 select-none pl-1">
						{editor.getAttributes('link').href}
					</div>
					<div className="flex items-center gap-px">
						<TooltipProvider disableHoverableContent delayDuration={100}>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link
										onClick={(e) => e.stopPropagation()}
										to={editor.getAttributes('link').href}
										target="_blank"
										className="text-foreground inline-flex cursor-pointer"
									>
										<Button variant="ghost" size="icon-xs">
											<FiArrowUpRight />
										</Button>
									</Link>
								</TooltipTrigger>
								<TooltipContent>Open link in a new tab</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button onClick={handleReset} variant="ghost" size="icon-xs">
										<FiTrash />
									</Button>
								</TooltipTrigger>
								<TooltipContent>Remove link</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>
			</div>
		</BubbleMenuBase>
	)
}
