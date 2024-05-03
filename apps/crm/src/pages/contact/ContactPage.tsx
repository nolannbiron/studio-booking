import { useGetContact } from '@/api/contact/hooks/useGetContact'
import ContactHeader from '@/pages/contact/components/ContactHeader'
import { Loading } from '@repo/ui/loading'
import { useParams } from 'react-router-dom'

export default function ContactPage(): JSX.Element {
	const { id } = useParams()
	const { data, isLoading } = useGetContact({ contactId: id })

	if (isLoading) return <Loading />
	if (!data) return <></>

	return (
		<>
			<ContactHeader contact={data.contact} />
		</>
	)
}
