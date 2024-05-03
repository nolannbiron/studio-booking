import { Badge } from '@repo/ui/badge'
import { TabsList, TabsTrigger } from '@repo/ui/tabs'
import { TbList, TbMessage } from 'react-icons/tb'

export default function ContactDetailsTabsList(): JSX.Element {
	return (
		<TabsList variant="bordered" className="w-full gap-1 px-5 pt-2.5">
			<TabsTrigger variant="bordered" value="details">
				<TbList />
				Details
			</TabsTrigger>
			<TabsTrigger disabled variant="bordered" value="comments" className="pr-20">
				<TbMessage />
				Comments
				<Badge
					variant="default"
					rounded="sm"
					className="absolute right-0 items-center justify-center px-1 py-0 text-[10px] opacity-100"
				>
					Coming soon
				</Badge>
			</TabsTrigger>
		</TabsList>
	)
}
