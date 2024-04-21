'use client'

import { useGetAccount } from '@/lib/client-api/account/hooks/useGetAccount'

export default function ReferralSettings(): JSX.Element {
	const { data } = useGetAccount()

	return <>{data?.user.firstName}</>
}
