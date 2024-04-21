import { useLocation } from 'react-router-dom'

export type Paths<T extends string> = {
	[key: string]: T
}

export function useActivePath<T extends string>(paths: Paths<T>): T | undefined {
	const location = useLocation()
	const pathnames = location.pathname.split('/').filter((x) => x)
	const activePath = pathnames[0]

	return paths[activePath]
}
