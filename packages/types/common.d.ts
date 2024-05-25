declare interface LocationCommon {
	state: {
		from?: {
			pathname?: string
			hash?: string
			key?: string
			search?: string
			state?: string | null
		}
		background?: {
			pathname?: string
			hash?: string
			key?: string
			search?: string
			state?: string | null
		}
		filters?: import('@/stores/filters.store').Filters
	}
}

declare interface Window {
	tinydrive: any
}

type Primitive = undefined | null | boolean | string | number | (() => void)

declare type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>
declare type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }
declare type PartialOn<T, K extends keyof T> = Omit<T, K> & {
	[P in K]: Partial<T[P]>
}
declare type NullableOn<T, K extends keyof T> = Omit<T, K> & {
	[P in K]: T[P] | null
}
declare type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>
type DeepRequired<T> = T extends Primitive
	? Required<T>
	: {
			[P in keyof T]-?: T[P] extends Array<infer U>
				? Array<DeepRequired<U>>
				: T[P] extends ReadonlyArray<infer U2>
					? DeepRequired<U2>
					: DeepRequired<T[P]>
		}

declare interface BaseResponse {
	success: boolean
}
declare type BaseResponseT<T> = {
	success: boolean
} & T

declare interface ErrorResponse {
	message: string
	agency?: {
		isActive: boolean
		inactiveReason: import('../api/agency/types').AgencyInactiveReason
	}
}

declare interface ArrayFilters {
	$size?: 'empty' | 'fill'
}

declare interface ArrayFieldFilters<T> {
	$in?: T[]
	$nin?: T[]
}

declare interface FieldFilters<T> {
	$exists?: boolean
	$in?: T[]
	$not?: FieldFilters<T>
	$ne?: T
	$eq?: T
	$or?: FieldFilters<T>[]
}

declare interface DateFilters extends FieldFilters<string> {
	$lt?: string
	$gt?: string
}

declare interface StringFilters extends FieldFilters<string> {
	$or?: StringFilters[]
}

declare interface NumberFilters extends FieldFilters<string> {
	$lt?: number
	$gt?: number
	$lte?: number
	$gte?: number
	$eq?: number
}

declare interface RangeFilter extends FieldFilters<string> {
	low?: NumberFilters
	high?: NumberFilters
}

declare interface InRangeFilter extends FieldFilters<string> {
	low?: NumberFilters
	high?: NumberFilters
}

declare interface GeoFilters {
	$geoWithin: {
		$box: number[][]
	}
}

declare type Entries<T> = {
	[K in keyof T]: [K, T[K]]
}[keyof T][]

declare type ObjectValues<T> = T[keyof T]
