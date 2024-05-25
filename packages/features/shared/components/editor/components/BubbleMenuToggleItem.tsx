import { cn } from '@repo/ui/lib/utils'
import { Toggle } from '@repo/ui/toggle'
import { type ComponentProps } from 'react'

interface Props extends ComponentProps<typeof Toggle> {
	children: React.ReactNode
	state: 'on' | 'off'
}

export default function BubbleMenuToggleItem({
	children,
	state,
	variant = 'transparent',
	rounded = 'none',
	onClick,
	className
}: Props): JSX.Element {
	return (
		<Toggle
			rounded={rounded}
			variant={variant}
			className={cn('focus:ring-ring w-9 flex-1 focus:ring-1', className)}
			data-state={state}
			onClick={onClick}
		>
			{children}
		</Toggle>
	)
}
