import { cn } from '@repo/ui/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@repo/ui/tooltip'
import { type PropsWithChildren } from 'react'

export interface CommandItemProps extends PropsWithChildren {
	tooltip?: React.ReactNode
	tooltipImage?: string
	selected?: boolean
	icon?: React.ReactNode | string
	onClick?: () => void
}

export default function CommandItem({
	children,
	selected,
	tooltip,
	tooltipImage,
	icon,
	onClick
}: CommandItemProps): JSX.Element {
	return (
		<Tooltip delayDuration={200}>
			<TooltipTrigger>
				<div
					className={cn(
						'focus:bg-accent focus-within:bg-accent focus-visible:bg-accent hover:bg-accent focus:text-accent-foreground relative flex w-full cursor-default select-none items-center gap-3 rounded-sm px-2 py-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
						selected && 'bg-accent text-accent-foreground'
					)}
					onClick={onClick}
				>
					{icon &&
						(typeof icon === 'string' ? (
							<div className="border-input flex h-full w-full max-w-[15%] items-center justify-center overflow-hidden rounded-md border bg-white">
								<img className="w-full" src={icon} alt="" />
							</div>
						) : (
							<div className="[&>svg]:fill-foreground/50 aspect-square h-full w-full max-w-[15%] [&>svg]:h-full [&>svg]:w-full">
								{icon}
							</div>
						))}
					<div className="flex flex-col items-start text-sm">
						{children}
						{tooltip && (
							<div className="text-foreground/60 flex-1 flex-grow text-left text-xs">
								{tooltip}
							</div>
						)}
					</div>
				</div>
			</TooltipTrigger>
			<TooltipContent
				// variant="contrast"
				side="right"
				className="flex w-40 flex-col gap-2 p-2 font-medium"
				sideOffset={12}
			>
				{tooltipImage && <img className="w-full rounded-md" src={tooltipImage} alt="" />}
				<div className="flex items-center gap-2 text-xs">{tooltip}</div>
			</TooltipContent>
		</Tooltip>
	)
}
