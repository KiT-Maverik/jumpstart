import { UseQueryResult } from '@tanstack/react-query'
import { isEqual } from 'lodash'
import { useCallback, useRef, useState } from 'react'

/**
 * Creates unified, type-safe interface for operating query params
 */
export const useQueryParamsController = <QueryParamsSchema>(defaultState: QueryParamsSchema) => {
	/** Query params to be used in actual API request */
	const [params, setParams] = useState<QueryParamsSchema>(defaultState)
	/** Data storage intended to collect all updates before calling actual API */
	const [draft, setDraft] = useState(<QueryParamsSchema>(defaultState))

	const query = useRef(null as UseQueryResult<unknown, unknown> | null)

	const isDraftUpdated = useCallback((keys?: Array<keyof QueryParamsSchema>) => {
		if (!keys) return isEqual(params, params)

		return keys.some(key => draft[key] !== params[key])
	}, [draft, params])

	const isCustomQueryFetched = useCallback((keys?: Array<keyof QueryParamsSchema>) => {
		if (!keys) return isEqual(params, defaultState)

		return keys.some(key => params[key] !== defaultState[key])
	}, [defaultState, params])

	const handleRefetch = useCallback((refetch: boolean) => {
		if (!query.current) throw new Error('No associated query')

		if (refetch) {
			setParams(draft)
			query.current.refetch()
		}
	}, [draft, query])

	const update = useCallback((data: Partial<QueryParamsSchema>, refetch: boolean = false) => {
		setDraft({ ...draft, ...data })

		handleRefetch(refetch)
	}, [draft, handleRefetch])

	const reset = useCallback((refetch: boolean = false) => {
		setParams(defaultState)
		setDraft(defaultState)

		handleRefetch(refetch)

		return defaultState
	}, [defaultState, handleRefetch])

	const associateQuery = useCallback((associatedQuery: UseQueryResult<unknown, unknown>) =>
			query.current = associatedQuery
		, [])

	const resetDraft = useCallback(() => setDraft(params), [params])

	/** Fetch query with custom params */
	const apply = useCallback(() => handleRefetch(true), [handleRefetch])

	return {
		associateQuery,
		apply,
		resetDraft,
		isCustomQueryFetched,
		isDraftUpdated,
		draft,
		get: () => draft,
		reset,
		update
	}
}
