'use client'

import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../lib/utils'

const avatarVariants = cva(
	'flex shrink-0 select-none overflow-hidden rounded-md transition-all duration-300 will-change-transform',
	{
		variants: {
			variant: {
				default: 'border-input border'
			},
			size: {
				'2xs': 'h-5 w-5 rounded-sm text-[11px]',
				xs: 'h-8 w-8 text-sm',
				sm: 'h-10 w-10 text-sm',
				md: 'h-14 w-14 text-lg',
				lg: 'h-16 w-16 rounded-2xl text-xl',
				xl: 'h-[72px] w-[72px] text-2xl',
				xxl: 'h-[108px] w-[108px] text-4xl',
				'3xl': 'h-[168px] w-[168px] text-5xl',
				icon: 'h-9 w-9'
			},
			clickable: {
				true: 'cursor-pointer transition-opacity hover:opacity-80',
				false: ''
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'sm',
			clickable: false
		}
	}
)

export type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> &
	VariantProps<typeof avatarVariants>

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
	({ className, size, clickable, variant, ...props }, ref) => (
		<AvatarPrimitive.Root
			ref={ref}
			className={cn(avatarVariants({ variant, size, clickable }), className)}
			{...props}
		/>
	)
)
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Image>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Image
		ref={ref}
		className={cn('z-20 aspect-square h-full w-full rounded-full', className)}
		{...props}
	/>
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Fallback>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Fallback
		ref={ref}
		className={cn(
			'bg-background dark:bg-background flex h-full w-full items-center justify-center',
			className
		)}
		{...props}
	/>
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
