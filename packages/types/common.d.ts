type Primitive = undefined | null | boolean | string | number | (() => void)

declare type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>
declare type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }
declare type PartialOn<T, K extends keyof T> = Omit<T, K> & {
	[P in K]?: Partial<T[P]>
}
declare type NullableOn<T, K extends keyof T> = Omit<T, K> & {
	[P in K]: T[P] | null
}
declare type NonNullableOn<T, K extends keyof T> = Omit<T, K> & {
	[P in K]: NonNullable<T[P]>
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

declare type Entries<T> = {
	[K in keyof T]: [K, T[K]]
}[keyof T][]

declare type ObjectValues<T> = T[keyof T]
