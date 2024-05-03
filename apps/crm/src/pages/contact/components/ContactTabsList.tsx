import { Badge } from '@repo/ui/badge'
import { TabsList, TabsTrigger } from '@repo/ui/tabs'
import { TbActivity, TbFile, TbFiles, TbFolder, TbSquareRoundedCheck } from 'react-icons/tb'

export default function ContactTabsList(): JSX.Element {
	return (
		<TabsList variant="bordered" className="w-full gap-1 px-5 pt-2.5">
			<TabsTrigger variant="bordered" value="activity">
				<TbActivity />
				Activity
			</TabsTrigger>
			<TabsTrigger variant="bordered" value="projects">
				<TbFolder />
				Projects
				<Badge
					variant="outline"
					rounded="sm"
					className="flex size-4 items-center justify-center p-0 opacity-100"
				>
					0
				</Badge>
			</TabsTrigger>
			<TabsTrigger variant="bordered" value="notes">
				<TbFile />
				Notes
				<Badge
					variant="outline"
					rounded="sm"
					className="flex size-4 items-center justify-center p-0 opacity-100"
				>
					0
				</Badge>
			</TabsTrigger>
			<TabsTrigger variant="bordered" value="tasks">
				<TbSquareRoundedCheck />
				Tasks
				<Badge
					variant="outline"
					rounded="sm"
					className="flex size-4 items-center justify-center p-0 opacity-100"
				>
					0
				</Badge>
			</TabsTrigger>
			<TabsTrigger variant="bordered" value="files">
				<TbFiles />
				Files
			</TabsTrigger>
		</TabsList>
	)
}
