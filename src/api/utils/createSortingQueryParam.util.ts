import { SORTING } from 'api/constants'

/**
 * A utility function that generates a sorting query parameter string from an array of sorting options.
 *
 * @param {Array.<[string, SORTING]>} sortingOptions
 * An array of tuples where each tuple contains:
 * 		- a `parameter` (string) representing the field name to sort by.
 * 		- a `direction` (SORTING) indicating the sorting direction (e.g., ascending or descending).
 *
 * @returns {string}
 * A comma-separated string of sorting parameters, prefixed with '-' for descending order.
 * Example: "name,-price"
 *
 */
export const createSortingQueryParam = (sortingOptions: [string, SORTING][]) => {
	return sortingOptions
		.map(([parameter, direction]) => `${direction === SORTING.DESC ? '-' : ''}${parameter}`)
		.join(',')
}
