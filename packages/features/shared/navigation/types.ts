import type { PathRouteProps, RouteObject } from 'react-router-dom'

export interface PathComponent extends PathRouteProps {
	path: string
	component: JSX.Element
}

export type TRoute = {
	name: string
	icon: JSX.Element
	hidden?: boolean
	element: JSX.Element
	path: string
	total?: number
	// children?: TRoute[]
}

export type TNavbarRoute = {
	enabled: boolean
	routes: TRoute[][]
}

export type TNavbarRoutes = {
	main: TNavbarRoute
	[key: string]: TNavbarRoute
}

export type TSettingsRoutes = {
	[key: string]: TRoute[]
}

export interface TRoutesConfig {
	navbar: TNavbarRoutes
	// onboarding: RouteObject[]
	auth: RouteObject[]
	settings: TSettingsRoutes
	general: (RouteObject & { layout?: React.ReactNode })[]
}

export enum EContactRoutes {
	ACTIVITY = 'activity',
	NOTES = 'notes',
	LIBRARY = 'library',
	TASKS = 'tasks',
	SESSIONS = 'sessions'
}

export type TContactRoutes = EContactRoutes
