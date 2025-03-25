import { useCallback } from 'react'
import {kebabCase} from 'lodash'

/**
 * Creates unified, type-safe controller for operating with data attributes
 */
export const useCreateDatasetController = <Keychain extends readonly string[]>(attributes: Keychain) => {
	type Key = Keychain[number]

	const getValue = useCallback(
		(element: HTMLElement, key: Key): string | undefined => element.dataset[key as keyof DOMStringMap]
		, []
	)

	const createAttributes = useCallback((dataset: { [key in Key]?: string }) => {
		const result: { [key: string]: string } = {}

		Object.entries(dataset).forEach(([attributeName, value]) => {
			if (typeof value === 'string') {
				result[kebabCase(`data-${attributeName}`)] = value
			}
		})

		return result
	}, [])

	return { getValue, createAttributes }
}
