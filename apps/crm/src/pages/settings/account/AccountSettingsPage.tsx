import { useGetAccount } from '@/api/account/hooks/useGetAccount'
import AccountSettingsForm from '@/pages/settings/account/components/AccountSettingsForm'
import { Loading } from '@repo/ui/loading'

export default function AccountSettings() {
	const { data, isLoading } = useGetAccount()

	if (!data || isLoading) return <Loading />

	return <AccountSettingsForm user={data.user} />
}
