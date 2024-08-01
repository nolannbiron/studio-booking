import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../lib/utils'

const inputClasses = cva(
	'placeholder:text-muted-foreground/30 focus-visible:ring-ring flex w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-inherit focus:outline-0 focus-visible:outline-0 focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'border-input',
				ghost: 'rounded-none border-transparent !px-0 !shadow-none focus:outline-transparent focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-transparent',
				error: 'border-red-500 focus-visible:ring-red-500 focus-visible:ring-transparent',
				transparent: 'border-transparent shadow-none focus-visible:ring-transparent'
			},
			size: {
				xs: 'h-7 text-xs',
				default: 'h-9',
				sm: 'h-8',
				lg: 'h-10'
			},
			isError: {
				true: 'ring-1 ring-red-500 focus-visible:ring-red-500',
				false: ''
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
			isError: false
		}
	}
)

// const inputClasses = cva(
// 	'placeholder:text-muted-foreground/50 flex w-full bg-transparent px-3 py-1 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
// 	{
// 		variants: {
// 			variant: {
// 				default:
// 					'border-input focus-visible:border-ring rounded-md border shadow-sm transition-colors focus-visible:ring-0',
// 				ghost: 'border-0 bg-transparent shadow-none focus-visible:ring-0 '
// 			},
// 			size: {
// 				default: 'h-9',
// 				sm: 'h-8',
// 				lg: 'h-10'
// 			}
// 		},
// 		defaultVariants: {
// 			variant: 'default',
// 			size: 'default'
// 		}
// 	}
// )

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
	VariantProps<typeof inputClasses>

const BaseInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, variant, size, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(inputClasses({ variant, size, className }), className)}
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
