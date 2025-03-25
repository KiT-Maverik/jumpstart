import { DeepPartial } from 'configuration/types/utility'

/**
 * Recursive merging for same-shaped objects,
 * where source has all properties, and other is a shallow copy
 */
export function mergeShallowCopy<Data extends object>(source: Data, newData: DeepPartial<Data>): Data {
	const result: Data = { ...source }
	for (const key in result) {
		if (Object.prototype.hasOwnProperty.call(newData, key)) {
			const resultValue = result[key]
			const newDataValue = newData[key] as typeof resultValue

			if (
				typeof resultValue === 'object' &&
				resultValue !== null &&
				!Array.isArray(resultValue) &&
				typeof newDataValue === 'object' &&
				newDataValue !== null &&
				!Array.isArray(newDataValue)
			) {
				result[key] = mergeShallowCopy(resultValue, newDataValue)
			} else {
				result[key] = newDataValue
			}
		}
	}
	return result
}
