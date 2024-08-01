import { deepCopy, isObject } from './lodash'
import { objectsAreEqual } from './objectsAreEqual'

export function arraysAreEqual<
	T extends string | number | Record<string, any> | Array<string | number | Record<string, any>> | any
>(array1: T[] | null | undefined, array2: T[] | null | undefined): boolean {
	if (!array1 && !array2) {
		return true
	}
	if (!Array.isArray(array1) || !Array.isArray(array2) || (array1 && !array2) || (array2 && !array1)) {
		return false
	}
	if (array1?.length !== array2?.length) {
		return false
	}

	const deepCopyArray1 = deepCopy(array1).sort()
	const deepCopyArray2 = deepCopy(array2).sort()

	for (let i = 0; i < (deepCopyArray1 as T[]).length; i++) {
		if (
			(!deepCopyArray1?.[i] && !!deepCopyArray2?.[i]) ||
			(!!deepCopyArray1?.[i] && !deepCopyArray2?.[i])
		) {
			return false
		}
		if (Array.isArray((deepCopyArray1 as T[])[i])) {
			if (
				arraysAreEqual(
					(deepCopyArray1 as T[])[i] as Array<string | number | Record<string, any>>,
					(deepCopyArray2 as T[])[i] as Array<string | number | Record<string, any>>
				) === false
			) {
				return false
			}
		} else if (isObject((deepCopyArray1 as T[])[i])) {
			if (
				objectsAreEqual(
					(deepCopyArray1 as T[])[i] as Record<string, any>,
					(deepCopyArray2 as T[])[i] as Record<string, any>
				) === false
			) {
				return false
			}
		} else {
			if ((deepCopyArray1 as T[])[i] !== (deepCopyArray2 as T[])[i]) {
				return false
			}
		}
	}

	return true
}
