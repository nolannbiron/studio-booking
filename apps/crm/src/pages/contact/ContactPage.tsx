import { useGetContact } from '@/api/contact/hooks/useGetContact'
import { EContactRoutes } from '@/navigation/types'
import ContactHeader from '@/pages/contact/components/ContactHeader'
import ContactTabsList from '@/pages/contact/components/ContactTabsList'
import ContactDetailsWrapper from '@/pages/contact/details/ContactDetailsWrapper'
import { Loading } from '@repo/ui/loading'
import { Tabs } from '@repo/ui/tabs'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'

export default function ContactPage(): JSX.Element {
	const { id } = useParams()

	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { data, isLoading } = useGetContact({ contactId: id })

	useEffect(() => {
		if (
			!pathname.includes(EContactRoutes.ACTIVITY) &&
			!pathname.includes(EContactRoutes.FILES) &&
			!pathname.includes(EContactRoutes.NOTES) &&
			!pathname.includes(EContactRoutes.PROJECTS) &&
			!pathname.includes(EContactRoutes.TASKS)
		) {
			navigate(`/contact/${id}/activity`)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname, id])

	const activeTab = pathname.includes(EContactRoutes.ACTIVITY)
		? EContactRoutes.ACTIVITY
		: pathname.includes(EContactRoutes.NOTES)
			? EContactRoutes.NOTES
			: pathname.includes(EContactRoutes.TASKS)
				? EContactRoutes.TASKS
				: pathname.includes(EContactRoutes.FILES)
					? EContactRoutes.FILES
					: pathname.includes(EContactRoutes.PROJECTS)
						? EContactRoutes.PROJECTS
						: EContactRoutes.ACTIVITY

	if (isLoading) return <Loading />
	if (!data) return <></>

	return (
		<>
			<ContactHeader contact={data.contact} />
			<div className="flex-1">
				<div className="flex h-full w-full flex-row flex-nowrap">
					<div className="flex w-[62%]  min-w-80">
						<Tabs
							className="w-full flex-1"
							defaultValue="activity"
							value={activeTab}
							onValueChange={(value) => navigate(`/contact/${id}/${value}`)}
						>
							<ContactTabsList />

							<Outlet />
						</Tabs>
					</div>

					<div className="w-[38%] min-w-64">
						<ContactDetailsWrapper contact={data.contact} />
					</div>
				</div>
			</div>
		</>
	)
}
