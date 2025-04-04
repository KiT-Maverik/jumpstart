import { useCallback, useMemo, useState } from 'react'

import { defaultPaginator } from 'api/constants'
import { Paginator } from 'api/schemas'

const getNextPageStatus =
	({ limit, offset }: Paginator, total: number) => offset + limit < total

const getPreviousPageStatus =
	(offset: number) => offset > 0

export const usePaginator = (total = 0) => {
	const [options, setOptions] = useState<Paginator>(defaultPaginator)

	const pagesQty = total / options.limit
	const hasNextPage = useMemo(() => getNextPageStatus(options, total), [total, options])
	const hasPreviousPage = useMemo(() => getPreviousPageStatus(options.offset), [total, options.offset])

	const nextPage = useCallback(() => {
		setOptions((prevOptions) => {
			const increment = prevOptions.offset + prevOptions.limit
			if (increment > total) {
				console.warn('Paginator: next page is out of range')
				return prevOptions
			}
			return { ...prevOptions, offset: increment }
		})
	}, [total])

	const previousPage = useCallback(() => {
		setOptions((prevOptions) => {
			const decrement = prevOptions.offset - prevOptions.limit
			if (decrement < 0) {
				console.warn('Paginator: previous page is out of range')
				return prevOptions
			}
			return { ...prevOptions, offset: decrement }
		})
	}, [])

	const setLimit = useCallback(
		(limit: Paginator['limit']) => setOptions({ ...options, limit })
		, [options]
	)

	const paginator = useMemo(
		() => ({
			hasNextPage,
			hasPreviousPage,
			pagesQty,
			setLimit,
			nextPage,
			previousPage,
			...options,
		}),
		[hasNextPage, hasPreviousPage, pagesQty, setLimit, nextPage, options]
	)

	return { paginator }
}
