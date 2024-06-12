// import { isDate } from '@/services/helpers'

export function isDate(value: any): value is Date {
	return value instanceof Date
}

export function isSameMinute(date1: Date, date2: Date): boolean {
	return date1.getTime() === date2.getTime()
}

export function set<T extends Record<string, any>>(
	object: T,
	path: string | string[],
	value: any,
	isImmutable = true
): T {
	return object == null
		? object
		: baseSet(
				isObject(object) ? (isImmutable ? deepCopy(object) : object) : object,
				path,
				isObject(value) || Array.isArray(value) ? (isImmutable ? deepCopy(value) : value) : value
			)
}

export function isEmpty(value: unknown): boolean {
	return (
		value == null || // From standard.js: Always use === - but obj == null is allowed to check null || undefined
		(typeof value === 'object' && Object.keys(value).length === 0) ||
		(typeof value === 'string' && value.trim().length === 0)
	)
}

export function omit<T extends Record<string, any>>(obj: T, keyToOmit: string | string[]): Omit<T, string> {
	const keys = Array.isArray(keyToOmit) ? keyToOmit : keyToOmit.split('.')

	if (keys.length === 1) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { [keys[0]]: _, ...rest } = obj
		return rest
	}

	const [currentKey, ...remainingKeys] = keys
	const nestedObj = obj[currentKey]

	if (nestedObj === undefined) {
		return obj
	}

	return {
		...obj,
		[currentKey]: omit(nestedObj, remainingKeys)
	}
}

export function pick<T extends { [key: string]: any }, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
	const picked: Partial<T> = {}
	keys.forEach((key) => {
		let nestedObj = obj as Record<string, any>
		let nestedPicked: Partial<T[typeof key]> = picked as Partial<T[typeof key]>
		const keyParts = (key as string).split('.')
		keyParts.forEach((nestedKey, index) => {
			if (Object.prototype.hasOwnProperty.call(nestedObj, nestedKey)) {
				if (index === keyParts.length - 1) {
					nestedPicked[nestedKey as keyof Partial<T[typeof key]>] = nestedObj[nestedKey]
				} else {
					nestedObj = nestedObj[nestedKey] as Record<string, any>
					nestedPicked[nestedKey as keyof Partial<T[typeof key]>] = nestedPicked[nestedKey] || {}
					nestedPicked = nestedPicked[nestedKey] as Partial<T[typeof key]>
				}
			}
		})
	})
	return picked as Pick<T, K>
}

function baseSet<T extends Record<string, any>>(object: T, path: string | string[], value: any): T {
	if (!isObject(object)) {
		return object
	}
	if (!Array.isArray(path)) {
		path = path.toString().match(/[^.[\]]+/g) || []
	}

	const length = path.length
	const lastIndex = length - 1

	let index = -1
	let nested = object

	while (nested != null && ++index < length) {
		const key = toKey(path[index])
		let newValue = value

		if (index != lastIndex) {
			const objValue = nested[key]
			newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {}
		}
		assignValue(nested, key, newValue)
		nested = nested[key]
	}
	return object
}

export function isObject(value: any): value is object {
	const type = typeof value
	return (
		(type === 'object' || type === 'function') &&
		!(value instanceof Date) &&
		!Array.isArray(value) &&
		value !== null
	)
}

function toKey(value: string | number) {
	const INFINITY = 1 / 0
	if (typeof value === 'string') {
		return value
	}
	const result = `${value}`
	return result == '0' && 1 / value == -INFINITY ? '-0' : result
}

function assignValue(object: Record<string, any>, key: string, value: any) {
	const objValue = object[key]

	if (!(Object.prototype.hasOwnProperty.call(object, key) && eq(objValue, value))) {
		if (value !== 0 || 1 / value === 1 / objValue) {
			baseAssignValue(object, key, value)
		}
	} else if (value === undefined && !(key in object)) {
		baseAssignValue(object, key, value)
	}
}

function baseAssignValue(object: Record<string, any>, key: string, value: any) {
	if (key == '__proto__') {
		Object.defineProperty(object, key, {
			configurable: true,
			enumerable: true,
			value: value,
			writable: true
		})
	} else {
		object[key] = value
	}
}

function eq(value: any, other: any) {
	return value === other || (value !== value && other !== other)
}

const MAX_SAFE_INTEGER = 9007199254740991
/** Used to detect unsigned integer values. */
const reIsUint = /^(?:0|[1-9]\d*)$/
function isIndex(value: any, length?: number) {
	const type = typeof value
	length = length == null ? MAX_SAFE_INTEGER : length

	return (
		!!length &&
		(type === 'number' || (type !== 'symbol' && reIsUint.test(value))) &&
		value > -1 &&
		value % 1 == 0 &&
		value < length
	)
}

export function isStringInt(string: string): boolean {
	// Try parsing the string to an integer
	const num = parseInt(string, 10)

	// Check if the result is a valid number and the same as the input string
	// This helps to avoid cases like "123abc" being considered as a valid integer
	return !isNaN(num) && num.toString() === string
}

type DeepCopyable =
	| {
			[key: string]: any
	  }
	| any[]

export function deepCopy<T extends DeepCopyable>(obj: T): T {
	if (obj === null || typeof obj !== 'object' || isDate(obj)) {
		// If the input is not an object, return it as is
		return obj
	}

	if (Array.isArray(obj)) {
		// If the input is an array, create a deep copy of each element
		return obj.map(deepCopy) as T
	}

	// If the input is an object, create a new object with deep copies of its properties
	const copy: { [key: string]: any } = {}
	Object.keys(obj).forEach((key) => {
		copy[key] = deepCopy(obj[key])
	})

	return copy as T
}
