import { arraysAreEqual } from './arraysAreEqual'
import { deepCopy, isDate, isObject, isSameMinute } from './lodash'

export function objectsAreEqual<T extends Record<string, any>>(
	obj1: T | null | undefined,
	obj2: T | null | undefined
): boolean {
	if (!obj1 && !obj2) {
		return true
	}
	if ((obj1 && !obj2) || (obj2 && !obj1) || !isObject(obj1) || !isObject(obj2)) {
		return false
	}

	const array1 = obj1 ? Object.keys(obj1) : []
	const array2 = obj2 ? Object.keys(obj2) : []

	if (array1.length !== array2.length || arraysAreEqual([...array1].sort(), [...array2].sort()) === false) {
		return false
	}
	const deepCopyObj1 = deepCopy(obj1)
	const deepCopyObj2 = deepCopy(obj2)
	for (let i = 0; i < array1.length; i++) {
		const key = array1[i]
		const valueA = deepCopyObj1?.[key]
		const valueB = deepCopyObj2?.[key]
		if (Array.isArray(valueA) || Array.isArray(valueB)) {
			if (!arraysAreEqual(valueA, valueB)) {
				return false
			}
		} else if (isDate(valueA) || isDate(valueB)) {
			if (!isSameMinute(new Date(valueA), new Date(valueB))) {
				return false
			}
		} else if (isObject(valueA) || isObject(valueB)) {
			if (!objectsAreEqual(valueA, valueB)) {
				return false
			}
		} else if (Number.isInteger(valueA) || Number.isInteger(valueB)) {
			if (parseInt(valueA) !== parseInt(valueB)) {
				return false
			}
		} else if (valueA !== valueB) {
			return false
		}
	}

	return true
}
