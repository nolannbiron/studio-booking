import { cn } from '@repo/ui/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@repo/ui/tooltip'
import { type PropsWithChildren } from 'react'

export interface BubbleMenuDropdownItemItemProps extends PropsWithChildren {
	tooltip?: React.ReactNode
	tooltipImage?: string
	selected?: boolean
	icon?: React.ReactNode | string
	onClick?: () => void
}

export default function BubbleMenuDropdownItem({
	children,
	selected,
	tooltip,
	tooltipImage,
	icon,
	onClick
}: BubbleMenuDropdownItemItemProps): JSX.Element {
	return (
		<Tooltip delayDuration={200}>
			<TooltipTrigger>
				<div
					className={cn(
						'focus:bg-accent focus-within:bg-accent focus-visible:bg-accent hover:bg-accent focus:text-accent-foreground relative flex w-full cursor-default select-none items-center gap-2 rounded-sm px-1 py-0.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
						selected && 'bg-accent text-accent-foreground'
					)}
					onClick={onClick}
				>
					{icon &&
						(typeof icon === 'string' ? (
							<div className="border-input flex h-6 w-6 items-center justify-center overflow-hidden rounded-sm border bg-white">
								<img className="h-full w-full" src={icon} alt="" />
							</div>
						) : (
							<div className="[&>svg]:fill-foreground/50 aspect-square h-full w-full [&>svg]:h-full [&>svg]:w-full">
								{icon}
							</div>
						))}
					<div className="flex flex-col items-start text-sm">{children}</div>
				</div>
			</TooltipTrigger>
			<TooltipContent
				variant="contrast"
				side="right"
				className="flex w-40 flex-col gap-2 p-2 font-medium"
				sideOffset={12}
			>
				{tooltipImage && <img className="w-full rounded-sm" src={tooltipImage} alt="" />}
				<div className="flex items-center gap-2 text-xs">{tooltip}</div>
			</TooltipContent>
		</Tooltip>
	)
}
