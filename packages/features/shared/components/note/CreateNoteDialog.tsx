import { useGetTeamContacts } from '@/api/contact/hooks/useGetTeamContacts'
import { useCreateNote } from '@/api/note/hooks/useCreateNote'
import { useTeamStore } from '@/state/team.state'
import { useTranslation } from '@repo/i18n/next/client'
import { Badge } from '@repo/ui/badge'
import { CommandDialog, CommandGroup, CommandInput, CommandItem, CommandList } from '@repo/ui/command'
import type { DialogProps } from '@repo/ui/dialog'
import { UserAvatar } from '@repo/ui/user/UserAvatar'
import { PiUser } from 'react-icons/pi'
import { useSearchParams } from 'react-router-dom'

type CreateNoteDialogProps = {
	entityId?: string
	entityType?: string
	asChild?: boolean
}

export default function CreateNoteDialog({
	open,
	onOpenChange,
	...props
}: CreateNoteDialogProps & DialogProps): JSX.Element {
	const { currentTeam } = useTeamStore()
	const { t } = useTranslation()
	const { data } = useGetTeamContacts({})

	const { mutate } = useCreateNote()
	const [_, setSearchParams] = useSearchParams()

	const handleCreateNote = async (entityId: string) => {
		mutate(
			{
				title: '',
				content: '',
				entityId,
				teamId: currentTeam.id,
				entityType: 'CONTACT'
			},
			{
				onSuccess: (data) => {
					setSearchParams({ noteId: data.note.id, modal: 'note' })
					onOpenChange?.(false)
				}
			}
		)
	}

	return (
		<CommandDialog
			{...props}
			open={open}
			onOpenChange={onOpenChange}
			contentClassName="max-w-2xl [&>div]:h-[60vh] [&>div]:flex [&>div]:flex-col"
		>
			<CommandInput placeholder={t('general.search_record')} />
			<CommandList className="group max-h-full flex-1 focus-within:outline-none">
				<CommandGroup heading="Contacts">
					{data?.contacts.map((contact) => (
						<CommandItem
							value={contact.name}
							key={contact.id}
							className="flex w-full cursor-pointer justify-between"
							onSelect={() => handleCreateNote(contact.id)}
						>
							<div className="flex items-center gap-2">
								<UserAvatar size="xs" user={contact} />
								<div>{contact.name}</div>
							</div>
							<Badge variant="default" className="text-xs">
								<div className="flex items-center gap-1">
									<PiUser className="block size-2" />
									Contact
								</div>
							</Badge>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
			<div className="bg-navbar h-12 border-t" />
		</CommandDialog>
	)
}
