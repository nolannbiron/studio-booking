'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../lib/utils'

const tooltipVariants = cva(
	'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 select-none overflow-hidden rounded-md px-3 py-1.5 text-xs shadow',
	{
		variants: {
			variant: {
				primary: 'bg-primary text-primary-foreground',
				secondary: 'bg-secondary text-secondary-foreground',
				contrast: 'dark:bg-background dark:text-foreground bg-black text-white',
				outline: 'border-input bg-background border shadow-sm'
			}
		},
		defaultVariants: {
			variant: 'outline'
		}
	}
)

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
	React.ElementRef<typeof TooltipPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> &
		VariantProps<typeof tooltipVariants> & { withPortal?: boolean }
>(({ withPortal = true, className, sideOffset = 5, variant, ...props }, ref) => {
	const Comp = withPortal ? TooltipPrimitive.Portal : React.Fragment

	return (
		<Comp>
			<TooltipPrimitive.Content
				ref={ref}
				sideOffset={sideOffset}
				className={cn(tooltipVariants({ variant }), className)}
				{...props}
			/>
		</Comp>
	)
})
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
