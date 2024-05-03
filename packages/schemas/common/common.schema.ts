export type TErrorSchema<T> = {
	[key in keyof T]?: string | string[]
}
