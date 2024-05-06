import { axios } from '@/api/axios'
import { noteKeys } from '@/api/note/noteKeys'
import type { TNoteReply } from '@repo/schemas/note'
import { useQuery } from '@tanstack/react-query'

export const useGetNote = ({ noteId }: { noteId?: string }) => {
	return useQuery<TNoteReply, Error, TNoteReply>({
		queryKey: noteKeys.detail({ noteId }),
		queryFn: () => axios.get(`/note/${noteId}`).then((res) => res.data),
		enabled: !!noteId
	})
}