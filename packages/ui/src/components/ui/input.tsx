'use client'

import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../lib/utils'

const inputClasses = cva(
	'placeholder:text-muted-foreground/50 flex h-9 w-full bg-transparent px-3 py-1 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			variant: {
				default:
					'border-input focus-visible:ring-ring rounded-md border shadow-sm transition-colors focus-visible:ring-1',
				ghost: 'border-0 bg-transparent shadow-none focus-visible:ring-0 '
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
)

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof inputClasses>

const BaseInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, variant, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(inputClasses({ variant, className }), className)}
				ref={ref}
				{...props}
			/>
		)
	}
)

BaseInput.displayName = 'BaseInput'

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
	if (props.type === 'password') {
		return <PasswordInput ref={ref} {...props} />
	}

	return <BaseInput ref={ref} {...props} />
})
Input.displayName = 'Input'

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(function PasswordInput(
	{ ...props },
	ref
) {
	const [show, setShow] = React.useState(false)

	return (
		<div className="relative w-full">
			<BaseInput ref={ref} {...props} type={show ? 'text' : 'password'} />
			<button
				onClick={() => setShow((prev) => !prev)}
				className="absolute right-3 top-1/2 -translate-y-1/2 transform"
				type="button"
			>
				{show ? (
					<EyeOpenIcon className="stroke-slate-700/70" scale={18} />
				) : (
					<EyeNoneIcon className="stroke-slate-700/70" scale={18} />
				)}
			</button>
		</div>
	)
})

export { Input }
