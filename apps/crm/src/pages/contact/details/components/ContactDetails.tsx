import { useUpdateContact } from '@/api/contact/hooks/useUpdateContact'
import { getGenresComboboxOptions } from '@/components/contacts/generics/ContactGenreCombobox'
import { contactTypeComboboxOptions } from '@/components/contacts/generics/ContactTypeCombobox'
import ContactsTableRowCellGenreItems from '@/components/contacts/table/row/genre/ContactsTableRowCellGenreItems'
import EditableLine from '@/components/forms/EditableLine/EditableLine'
import { useTeamStore } from '@/state/team.state'
import { useTranslation } from '@repo/i18n/next/client'
import type { ContactType } from '@repo/prisma/enums'
import type { TErrorSchema } from '@repo/schemas/common'
import { type TContact, type TUpdateContact, ZUpdateContactSchema } from '@repo/schemas/contact'
import { useTheme } from '@repo/ui/theme'
import { useState } from 'react'
import {
	PiCaretDown,
	PiEnvelope,
	PiFacebookLogo,
	PiGlobe,
	PiGuitar,
	PiIdentificationCard,
	PiInstagramLogo,
	PiPhone,
	PiSnapchatLogo,
	PiSpotifyLogo,
	PiTiktokLogo,
	PiTwitterLogo,
	PiYoutubeLogo
} from 'react-icons/pi'
import { useDebounce } from 'react-use'

const isFormDirty = (contact: TContact, formData: TUpdateContact) => {
	return (
		contact.name !== formData.name || contact.email !== formData.email || contact.type !== formData.type
	)
}

export default function ContactDetails({
	contact: { genres, ...contact }
}: {
	contact: TContact
}): JSX.Element {
	const { t } = useTranslation()
	const { mutate } = useUpdateContact()
	const { colorMode, resolvedTheme } = useTheme()
	const theme = colorMode === 'system' ? resolvedTheme : colorMode
	const { currentTeam } = useTeamStore()
	const [formData, setFormData] = useState<Omit<TUpdateContact, 'genres'>>(contact)
	const [genreIds, setGenreIds] = useState<string[]>(genres?.map((g) => g.id) ?? [])
	const [errors, setErrors] = useState<TErrorSchema<TUpdateContact>>({})

	useDebounce(() => handleSubmit(), 500, [formData])

	const handleChange = (key: keyof TUpdateContact, value: TUpdateContact[keyof TUpdateContact]) => {
		setFormData((prev) => ({ ...prev, [key]: value }))
		setErrors((prev) => ({ ...prev, [key]: undefined }))
	}

	const handleSubmit = () => {
		if (!isFormDirty(contact, formData)) return

		const validation = ZUpdateContactSchema.safeParse(formData)

		if (!validation.success) {
			setErrors(validation.error.flatten().fieldErrors)
			return
		}

		mutate({
			...formData,
			teamId: contact.teamId,
			contactId: contact.id,
			email: !formData.email ? null : formData.email
		})
	}

	const handleChangeGenres = (genreId: string) => {
		const newGenres = genres?.some((g) => g.id === genreId)
			? genres.filter((g) => g.id !== genreId).map((g) => g.id)
			: [...(genres?.map((g) => g.id) ?? []), genreId]

		mutate(
			{
				teamId: contact.teamId,
				contactId: contact.id,
				genres: newGenres
			},
			{
				onSuccess(data) {
					setGenreIds(data.contact.genres?.map((g) => g.id) ?? [])
					// setIsOpen(false)
				}
			}
		)
	}

	const handleChangeType = (type: ContactType) => {
		mutate(
			{
				teamId: contact.teamId,
				contactId: contact.id,
				type: type === contact.type ? null : type
			},
			{
				onSuccess(data) {
					setFormData((prev) => ({ ...prev, type: data.contact.type }))
				}
			}
		)
	}

	return (
		<div className="h-full space-y-2 px-5 pt-5">
			<EditableLine
				label="Name"
				icon={<PiIdentificationCard />}
				value={formData.name}
				type="text"
				errors={errors.name}
				onChange={(val) => handleChange('name', val)}
			/>
			<EditableLine
				label="Type"
				closeOnSelect
				icon={<PiCaretDown />}
				value={formData.type}
				type="combobox"
				options={contactTypeComboboxOptions}
				onSelect={(value) => handleChangeType(value as ContactType)}
				triggerClassName="flex gap-1 min-h-8 max-w-full text-sm truncate flex-1 data-[state=open]:absolute data-[state=open]:z-50 bg-background data-[state=open]:top-0 w-full hover:bg-accent data-[state=open]:hover:bg-background border p-1 rounded-md overflow-hidden border-transparent data-[state=open]:flex-wrap data-[state=open]:border-primary flex-nowrap"
			>
				{formData.type ? (
					t(`contact.type.${formData.type}`)
				) : (
					<span className="text-muted-foreground/70">Set type</span>
				)}
			</EditableLine>
			<EditableLine
				label="Genres"
				icon={<PiGuitar />}
				value={genreIds}
				type="combobox"
				options={getGenresComboboxOptions(currentTeam.genres, theme)}
				onSelect={handleChangeGenres}
				triggerClassName="flex gap-1 items-stretch min-h-8 max-w-full truncate flex-1 data-[state=open]:h-fit data-[state=open]:absolute data-[state=open]:z-50 bg-background data-[state=open]:top-0 w-full hover:bg-accent data-[state=open]:hover:bg-background border p-1 rounded-md overflow-hidden border-transparent data-[state=open]:flex-wrap data-[state=open]:border-primary flex-nowrap"
			>
				<ContactsTableRowCellGenreItems placeholder="Set genres" genres={genres ?? []} />
			</EditableLine>
			<EditableLine
				label="Email"
				icon={<PiEnvelope />}
				value={formData.email}
				type="text"
				onChange={(val) => handleChange('email', val)}
			/>
			<EditableLine
				label="Phone"
				icon={<PiPhone />}
				value={formData.phone}
				type="text"
				onChange={(val) => handleChange('phone', val)}
			/>
			<EditableLine
				label="Instagram"
				icon={<PiInstagramLogo />}
				value={formData.instagram}
				type="text"
				onChange={(val) => handleChange('instagram', val)}
			/>
			<EditableLine
				label="Facebook"
				icon={<PiFacebookLogo />}
				value={formData.facebook}
				type="text"
				onChange={(val) => handleChange('facebook', val)}
			/>
			<EditableLine
				label="Twitter"
				icon={<PiTwitterLogo />}
				value={formData.twitter}
				type="text"
				onChange={(val) => handleChange('twitter', val)}
			/>
			<EditableLine
				label="Youtube"
				icon={<PiYoutubeLogo />}
				value={formData.youtube}
				type="text"
				onChange={(val) => handleChange('youtube', val)}
			/>
			<EditableLine
				label="Tiktok"
				icon={<PiTiktokLogo />}
				value={formData.tiktok}
				type="text"
				onChange={(val) => handleChange('tiktok', val)}
			/>
			<EditableLine
				label="Spotify"
				icon={<PiSpotifyLogo />}
				value={formData.spotify}
				type="text"
				onChange={(val) => handleChange('spotify', val)}
			/>
			<EditableLine
				label="Snapchat"
				icon={<PiSnapchatLogo />}
				value={formData.snapchat}
				type="text"
				onChange={(val) => handleChange('snapchat', val)}
			/>
			<EditableLine
				label="Website"
				icon={<PiGlobe />}
				value={formData.website}
				type="text"
				onChange={(val) => handleChange('website', val)}
			/>
		</div>
	)
}
