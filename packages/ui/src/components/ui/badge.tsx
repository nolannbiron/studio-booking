import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../lib/utils'

const badgeVariants = cva(
	'focus:ring-ring inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
	{
		variants: {
			variant: {
				default: 'border-blue-300 bg-blue-100 text-blue-900 shadow',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent shadow',
				outline: 'bg-muted-foreground/10 border-muted-foreground/20 text-muted-foreground border'
			},
			rounded: {
				full: 'rounded-full',
				md: 'rounded-md',
				sm: 'rounded',
				lg: 'rounded-lg'
			}
		},
		defaultVariants: {
			variant: 'default',
			rounded: 'md'
		}
	}
)

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, rounded, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant, rounded }), className)} {...props} />
}

export { Badge, badgeVariants }
