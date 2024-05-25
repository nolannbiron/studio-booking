import type { TTimelineEvent } from '@repo/schemas/timeline'
import { FiEdit2, FiPlus } from 'react-icons/fi'
import { PiFile } from 'react-icons/pi'

export default function TimelineEventIcon({ event }: { event: TTimelineEvent }): JSX.Element {
	return (
		<div className="shadow-background relative z-20 flex size-5 items-center justify-center rounded border border-blue-300 bg-blue-100 p-0 shadow-[0_0_0_6px] dark:border-sky-800 dark:bg-[#293c60]">
			{event.type === 'ENTITY_CREATED' ? (
				<FiPlus className="size-4 text-blue-600 dark:text-blue-400" />
			) : event.type === 'VALUES_UPDATED' ? (
				<FiEdit2 className="size-3 text-blue-600 dark:text-blue-400" />
			) : (
				<PiFile className="size-3.5 text-blue-600 dark:text-blue-400" />
			)}
		</div>
	)
}
