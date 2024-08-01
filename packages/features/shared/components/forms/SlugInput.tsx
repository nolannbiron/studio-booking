import type { InputProps } from '@repo/ui/input'
import { Input } from '@repo/ui/input'
import { forwardRef } from 'react'

export default forwardRef<HTMLInputElement, InputProps>(function SlugInput(
	{ disabled, ...field },
	ref
): JSX.Element {
	return (
		<div
			ref={ref}
			aria-disabled={disabled}
			className="border-input placeholder:text-muted-foreground/50 focus-visible:ring-ring flex h-9 w-full overflow-hidden rounded-md border bg-transparent py-0 pl-3 pr-0 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 aria-[disabled=true]:opacity-50"
		>
			<Input
				className="h-full border-none py-0 pl-0 focus-visible:border-none focus-visible:ring-0"
				placeholder="my-workspace"
				disabled={disabled}
				{...field}
			/>
			<label className="text-secondary-foreground bg-secondary flex flex-1 items-center px-3 text-sm">
				{process.env.VITE_PUBLIC_COOKIE_DOMAIN || 'example.com'}
			</label>
		</div>
	)
})
