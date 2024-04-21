import AccountSettings from '@/components/settings/account/account-settings'
import { getServerSession } from '@repo/feature-auth/lib/getServerSession'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AccountSettingsPage() {
	const session = await getServerSession()

	if (!session) {
		return <></>
	}

	return <AccountSettings user={session.user} />
}
