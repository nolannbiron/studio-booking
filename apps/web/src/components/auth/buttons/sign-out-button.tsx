'use client'

import { setLocalTeam } from '@/lib/stores/team.store'
import type { ButtonProps } from '@repo/ui/button'
import { Button } from '@repo/ui/button'
import { signOut } from 'next-auth/react'
import { FiLogOut } from 'react-icons/fi'

export default function SignoutButton({ onClick, ...props }: ButtonProps): JSX.Element {
	return (
		<Button
			{...props}
			type="button"
			onClick={(e) => {
				onClick?.(e)
				setLocalTeam(undefined)
				signOut()
			}}
		>
			Logout
			<FiLogOut />
		</Button>
	)
}
