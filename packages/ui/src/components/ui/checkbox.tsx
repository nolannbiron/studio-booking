'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon, MinusIcon } from '@radix-ui/react-icons'
import * as React from 'react'

import { cn } from '../../lib/utils'

export type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
	({ className, ...props }, ref) => (
		<CheckboxPrimitive.Root
			ref={ref}
			className={cn(
				'border-border data-[state=unchecked]:hover:bg-muted/40 focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary  data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground peer h-4 w-4 shrink-0 rounded-sm border shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
				{props.checked === 'indeterminate' && <MinusIcon className="size-3.5" />}
				{props.checked === true && <CheckIcon className="size-3.5" />}
				{typeof props.checked === 'undefined' && <CheckIcon className="size-3.5" />}
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	)
)
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
