import NewBookingForm from '@/components/bookings/new-booking/NewBookingForm'
import { useTranslation } from '@repo/i18n/next/client'
import { Button } from '@repo/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@repo/ui/dialog'
import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'

export default function NewBookingDialog({ children }: PropsWithChildren): JSX.Element {
	const { t } = useTranslation()
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{children ?? (
					<Button>
						<FiPlus /> {t('button.create_booking')}
					</Button>
				)}
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<h2>{t('button.create_booking')}</h2>
				</DialogHeader>
				<NewBookingForm onClose={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	)
}
