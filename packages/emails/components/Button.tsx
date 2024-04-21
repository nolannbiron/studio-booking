import { Button as ButtonBase } from '@react-email/button'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

export const buttonVariants = cva(
	'focus-visible:ring-ring isolate inline-flex items-center justify-center gap-3 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60',
	{
		variants: {
			variant: {
				default: [
					'bg-primary relative isolate inline-flex items-center justify-center rounded-lg border border-transparent py-[calc(theme(spacing[2])-1px)] text-white  shadow focus:outline-none active:pt-2.5 disabled:opacity-50 sm:py-[calc(theme(spacing[2])-1px)] [&>svg]:text-blue-50'
				],
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
				outline:
					'border-input bg-background hover:bg-muted dark:hover:bg-muted/60 hover:text-secondary-foreground border shadow-sm',
				secondary:
					'bg-secondary text-secondary-foreground border-input hover:bg-secondary/80 border shadow-sm',
				ghost: 'hover:bg-secondary hover:text-secondary-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				contrast: [
					'bg-foreground relative isolate inline-flex items-center justify-center rounded-lg border border-transparent py-[calc(theme(spacing[3])-1px)] text-white  shadow focus:outline-none active:pt-1.5 disabled:opacity-50 sm:py-[calc(theme(spacing[1.5])-1px)] [&>svg]:text-blue-50'
				],
				unstyled: 'text-foreground hover:text-foreground bg-transparent hover:bg-transparent'
			},
			size: {
				default: 'h-8 px-4 py-2',
				sm: 'h-9 px-3.5',
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
		}
	}
)

export type ButtonProps = React.PropsWithChildren<VariantProps<typeof buttonVariants>>

export default function Button({ children }: ButtonProps): JSX.Element {
	return <ButtonBase className={buttonVariants({ variant: 'default' })}>{children}</ButtonBase>
}
