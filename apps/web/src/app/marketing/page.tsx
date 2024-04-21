import { getServerSession } from '@repo/feature-auth/lib/getServerSession'

export default async function Page() {
	const session = await getServerSession()

	return <>Home {session?.user.fullName}</>
}
