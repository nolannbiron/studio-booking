import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../lib/utils'

const buttonVariants = cva(
	'focus-visible:ring-ring isolate inline-flex items-center justify-center gap-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60',
	{
		variants: {
			variant: {
				default: [
					'bg-primary relative isolate inline-flex items-center justify-center rounded-lg border border-transparent py-[calc(theme(spacing[1.5])-1px)] text-white  shadow-md focus:outline-none active:pt-2 disabled:opacity-50 sm:py-[calc(theme(spacing[1.5])-1px)] [&>svg]:text-blue-50',
					'after:absolute after:-inset-px after:-z-10 after:rounded-[calc(theme(borderRadius.md)-1px)] after:shadow-[shadow:inset_0_1.5px_theme(colors.white/15%),inset_0_-2.5px_theme(colors.black/20%)] after:transition-all after:transition-all after:transition-all hover:after:bg-white/10 active:after:shadow-[shadow:inset_0_0,inset_0_0] after:disabled:shadow-[shadow:inset_0_0,inset_0_0]',
					'before:bg-primary before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.md)-1px)] before:shadow active:before:shadow-black/20',
					'dark:bg-primary dark:hover:bg-primary/90 dark:border-white/10 dark:before:hidden dark:before:hidden dark:after:-inset-px dark:after:shadow-[shadow:inset_0_1.5px_theme(colors.white/15%),inset_0_-2.5px_theme(colors.black/25%)] dark:active:after:shadow-[shadow:inset_0_0,inset_0_0] dark:after:disabled:shadow-[shadow:inset_0_0,inset_0_0]'
				],
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
				outline:
					'border-input bg-background hover:bg-muted dark:hover:bg-border hover:text-secondary-foreground border shadow-sm',
				'outline-placeholder':
					'bg-muted dark:bg-muted/20 border-input hover:bg-input text-foreground/70 dark:text-muted-foreground hover:bg-input border border-dashed shadow-sm',
				secondary:
					'bg-secondary text-secondary-foreground border-input hover:bg-secondary/80 border shadow-sm',
				ghost: 'hover:bg-secondary hover:text-secondary-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				contrast: [
					'bg-foreground relative isolate inline-flex items-center justify-center rounded-lg border border-transparent py-[calc(theme(spacing[3])-1px)] text-white  shadow focus:outline-none active:pt-1.5 disabled:opacity-50 sm:py-[calc(theme(spacing[1.5])-1px)] [&>svg]:text-blue-50',
					'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(theme(borderRadius.md)-1px)] after:shadow-[shadow:inset_0_1.5px_theme(colors.white/0%),inset_0_-2px_theme(colors.white/35%)] after:transition-all after:transition-all hover:after:bg-white/10 active:after:shadow-[shadow:inset_0_0,inset_0_0] after:disabled:shadow-[shadow:inset_0_0,inset_0_0]',
					'before:bg-foreground before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.md)-1px)] before:shadow active:before:shadow-black/20',
					'dark:text-background dark:border-white/5 dark:bg-white dark:before:hidden dark:before:hidden dark:before:bg-white dark:after:-inset-px dark:after:shadow-[shadow:inset_0_1.5px_theme(colors.white/0%),inset_0_-2.5px_theme(colors.black/35%)] dark:hover:bg-white/90 dark:active:after:shadow-[shadow:inset_0_1.5px_theme(colors.white/0%),inset_0_-2px_theme(colors.black/0%)]'
				],
				unstyled: 'text-foreground hover:text-foreground bg-transparent hover:bg-transparent'
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-8 px-3.5',
				lg: 'h-11 px-8 text-base/6',
				xl: 'h-12 px-8 py-2 text-lg',
				'icon-xs': 'h-7 w-7',
				'icon-sm': 'aspect-square h-8 w-8',
				icon: 'h-10 w-10',
				'icon-lg': 'aspect-square h-11 w-11',
				'icon-xl': 'h-10 w-10 lg:h-12 lg:w-12 lg:[&>svg]:h-5 lg:[&>svg]:w-5',
				auto: 'aspect-auto h-auto w-auto'
			},
			rounded: {
				default: 'rounded-md',
				full: 'rounded-full',
				none: 'rounded-none'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
			rounded: 'default'
		},
		compoundVariants: [
			{
				rounded: 'full',
				variant: ['default', 'contrast'],
				className:
					'before:rounded-[calc(theme(borderRadius.full)-1px)] after:-inset-px after:rounded-[calc(theme(borderRadius.full)-1px)] dark:after:rounded-[calc(theme(borderRadius.full)-1px)]'
			}
		]
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, rounded, isLoading, disabled, children, ...props }, ref) => {
		return (
			<button
				disabled={disabled || isLoading}
				className={cn(buttonVariants({ variant, size, className, rounded }))}
				ref={ref}
				{...props}
			>
				{isLoading ? (
					<div className="flex items-center justify-center">
						<svg
							className="mr-3 h-5 w-5 animate-spin text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							/>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
							/>
						</svg>
					</div>
				) : (
					children
				)}
			</button>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
