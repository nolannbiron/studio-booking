import Loader from '@/components/loader'

export default async function Loading() {
	return (
		<div className="flex h-screen w-screen flex-1 items-center justify-center gap-2 text-xl">
			<Loader />
		</div>
	)
}
