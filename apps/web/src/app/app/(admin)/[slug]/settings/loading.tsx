import Loader from '@/components/loader'

export default function Loading(): JSX.Element {
	return (
		<div className="flex h-full w-full flex-1 items-center justify-center gap-2 text-xl">
			<Loader />
		</div>
	)
}
