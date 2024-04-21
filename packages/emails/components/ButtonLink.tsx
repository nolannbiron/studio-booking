import type { LinkProps } from '@react-email/link'
import { Link } from '@react-email/link'
import * as React from 'react'

import type { ButtonProps } from './Button'
import { buttonVariants } from './Button'

export default function ButtonLink({
	children,
	className,
	variant,
	size,
	rounded,
	...props
}: React.PropsWithChildren<LinkProps & ButtonProps>): JSX.Element {
	return (
		<Link {...props} className={buttonVariants({ variant, size, rounded, className })}>
			{children}
		</Link>
	)
}
