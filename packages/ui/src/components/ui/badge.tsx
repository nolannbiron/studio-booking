import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../lib/utils'

const badgeVariants = cva(
	'focus:ring-ring inline-flex items-center border font-semibold transition-colors focus:outline-0 focus:ring-1 focus:ring-offset-2',
	{
		variants: {
			clickable: {
				true: 'cursor-pointer'
			},
			variant: {
				default:
					'border-blue-300 bg-blue-100 text-blue-900 shadow dark:border-[#314872] dark:bg-[#293c60] dark:text-[#E5EEFF]',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent shadow',
				outline: 'bg-muted-foreground/10 border-muted-foreground/20 text-muted-foreground border',
				'outline-dashed':
					'bg-muted-foreground/10 border-muted-foreground/20 text-muted-foreground border-dashed'
			},
			rounded: {
				full: 'rounded-full',
				md: 'rounded-md',
				sm: 'rounded',
				lg: 'rounded-lg'
			},
			size: {
				sm: 'px-0.5 py-0.5 text-xs',
				md: 'px-3 py-1 text-sm',
				lg: 'px-4 py-2 text-base'
			}
		},
		defaultVariants: {
			variant: 'default',
			rounded: 'md',
			size: 'sm',
			clickable: false
		},
		compoundVariants: [
			{
				clickable: true,
				variant: ['outline', 'outline-dashed'],
				className: 'hover:bg-accent'
			}
		]
	}
)

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, clickable, size, rounded, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant, clickable, size, rounded }), className)} {...props} />
}

export { Badge, badgeVariants }
