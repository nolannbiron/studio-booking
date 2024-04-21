'use client'

import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import * as React from 'react'

import { cn } from '../../lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const BaseInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				'border-input placeholder:text-muted-foreground/50 focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			ref={ref}
			{...props}
		/>
	)
})

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
