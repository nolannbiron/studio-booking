import type { TContactsTableRow } from '@/components/contacts/table/ContactsTable'
import ContactsTableFooterCalculation from '@/components/contacts/table/footer/ContactsTableFooterCalculation'
import ContactsTableFooterTotalCell from '@/components/contacts/table/footer/ContactsTableFooterTotalCell'
import { createColumnHelper } from '@tanstack/react-table'
import {
	PiCaretDownFill,
	PiFacebookLogo,
	PiGlobe,
	PiGuitar,
	PiInstagramLogo,
	PiSnapchatLogo,
	PiSpotifyLogo,
	PiTiktokLogo,
	PiTwitterLogo,
	PiYoutubeLogo
} from 'react-icons/pi'

const columnHelper = createColumnHelper<TContactsTableRow>()

export const columns = [
	columnHelper.accessor('name', {
		id: 'name',
		header: 'Name',
		size: 250,
		minSize: 250,
		cell: (info) => info.getValue(),
		footer: (info) => <ContactsTableFooterTotalCell {...info} />
	}),
	columnHelper.accessor('type', {
		id: 'type',
		header: () => (
			<div className="flex items-center gap-2">
				<PiCaretDownFill className="text-muted-foreground" />
				Type
			</div>
		),
		minSize: 100,
		maxSize: 200,
		cell: (info) => info.getValue(),
		footer: (info) => <ContactsTableFooterCalculation key={info.header.id} {...info} />
	}),
	columnHelper.accessor('genres', {
		id: 'genres',
		header: () => (
			<div className="flex items-center gap-2">
				<PiGuitar className="text-muted-foreground" />
				Genre
			</div>
		),
		minSize: 100,
		maxSize: 200,
		cell: (info) => info.getValue(),
		footer: (info) => <ContactsTableFooterCalculation key={info.header.id} {...info} />
	}),
	columnHelper.accessor('instagram', {
		id: 'instagram',
		header: () => (
			<div className="flex items-center gap-2">
				<PiInstagramLogo className="text-muted-foreground" />
				Instagram
			</div>
		),
		minSize: 100,
		maxSize: 200,
		cell: (info) => info.getValue(),
		footer: (info) => <ContactsTableFooterCalculation key={info.header.id} {...info} />
	}),
	columnHelper.accessor('facebook', {
		id: 'facebook',
		header: () => (
			<div className="flex items-center gap-2">
				<PiFacebookLogo className="text-muted-foreground" />
				Facebook
			</div>
		),
		minSize: 100,
		maxSize: 200,
		cell: (info) => info.getValue(),
		footer: (info) => <ContactsTableFooterCalculation key={info.header.id} {...info} />
	}),
	columnHelper.accessor('twitter', {
		id: 'twitter',
		header: () => (
			<div className="flex items-center gap-2">
				<PiTwitterLogo className="text-muted-foreground" />
				Twitter
			</div>
		),
		minSize: 100,
		maxSize: 200,
		cell: (info) => info.getValue(),
		footer: (info) => <ContactsTableFooterCalculation key={info.header.id} {...info} />
	}),
	columnHelper.accessor('youtube', {
		id: 'youtube',
		header: () => (
			<div className="flex items-center gap-2">
				<PiYoutubeLogo className="text-muted-foreground" />
				Youtube
			</div>
		),
		minSize: 100,
		maxSize: 200,
		cell: (info) => info.getValue(),
		footer: (info) => <ContactsTableFooterCalculation key={info.header.id} {...info} />
	}),
	columnHelper.accessor('tiktok', {
		id: 'tiktok',
		header: () => (
			<div className="flex items-center gap-2">
				<PiTiktokLogo className="text-muted-foreground" />
				TikTok
			</div>
		),
		minSize: 100,
		maxSize: 200,
		cell: (info) => info.getValue(),
		footer: (info) => <ContactsTableFooterCalculation key={info.header.id} {...info} />
	}),
	columnHelper.accessor('spotify', {
		id: 'spotify',
		header: () => (
			<div className="flex items-center gap-2">
				<PiSpotifyLogo className="text-muted-foreground" />
				Spotify
			</div>
		),
		minSize: 100,
		maxSize: 200,
		cell: (info) => info.getValue(),
		footer: (info) => <ContactsTableFooterCalculation key={info.header.id} {...info} />
	}),
	columnHelper.accessor('snapchat', {
		id: 'snapchat',
		header: () => (
			<div className="flex items-center gap-2">
				<PiSnapchatLogo className="text-muted-foreground" />
				Snapchat
			</div>
		),
		minSize: 100,
		maxSize: 200,
		cell: (info) => info.getValue(),
		footer: (info) => <ContactsTableFooterCalculation key={info.header.id} {...info} />
	}),
	columnHelper.accessor('website', {
		id: 'website',
		header: () => (
			<div className="flex items-center gap-2">
				<PiGlobe className="text-muted-foreground" />
				Website
			</div>
		),
		minSize: 100,
		maxSize: 200,
		cell: (info) => info.getValue(),
		footer: (info) => <ContactsTableFooterCalculation key={info.header.id} {...info} />
	})
]
