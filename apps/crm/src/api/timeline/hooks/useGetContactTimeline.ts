import { axios } from '@/api/axios'
import { timelineKeys } from '@/api/timeline/timelineKeys'
import type { TTimelineEventsReply } from '@repo/schemas/timeline'
import { useQuery } from '@tanstack/react-query'

export const useGetContactTimeline = ({ contactId }: { contactId?: string }) => {
	return useQuery<TTimelineEventsReply, Error, TTimelineEventsReply>({
		queryKey: timelineKeys.contact(contactId),
		queryFn: () => axios.get(`/contact/${contactId}/timeline`).then((res) => res.data)
	})
}
