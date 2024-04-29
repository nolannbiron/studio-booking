import { AuthProvider } from '@repo/prisma/enums'
import { Button } from '@repo/ui/button'
import { cn } from '@repo/ui/lib/utils'
import { BsFacebook } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'

import type { AvailableAuthProviders } from './types'

type AuthButtonProps = {
	onClick?: (type: AvailableAuthProviders) => void
	isLoading: boolean
	disabled?: boolean
	type: AvailableAuthProviders
	label?: string
}

export function AuthProviderButton({ onClick, isLoading, type, label }: AuthButtonProps) {
	return (
		<Button
			disabled={isLoading}
			isLoading={isLoading}
			variant="outline"
			type="button"
			size="md"
			onClick={() => onClick?.(type)}
			className={cn({
				'cursor-not-allowed': isLoading
			})}
		>
			<AuthButtonComp type={type} label={label} />
		</Button>
	)
}

const AuthButtonComp = ({ type, label }: Pick<AuthButtonProps, 'type' | 'label'>) => {
	switch (type) {
		case AuthProvider.FACEBOOK:
			return (
				<>
					<BsFacebook className="h-4 w-4 text-[#1877f2]" />
					{label ?? 'Facebook'}
				</>
			)
		case AuthProvider.GOOGLE:
			return (
				<>
					<FcGoogle className="h-4 w-4" />
					{label ?? 'Google'}
				</>
			)

		default:
			return null
	}
}
