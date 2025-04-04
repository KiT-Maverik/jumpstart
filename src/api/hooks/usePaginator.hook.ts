import { useCallback, useMemo, useState } from 'react'

import { defaultPaginator } from 'api/constants'
import { Paginator } from 'api/schemas'

const getNextPageStatus =
	({ limit, offset }: Paginator, total: number) => offset + limit < total

const getPreviousPageStatus =
	(offset: number) => offset > 0

export const usePaginator = (total = 0) => {
	const [options, setOptions] = useState<Paginator>(defaultPaginator)

	const pagesQty = useMemo(() => total / options.limit, [total, options.limit])
	const hasNextPage = useMemo(() => getNextPageStatus(options, total), [total, options])
	const hasPreviousPage = useMemo(() => getPreviousPageStatus(options.offset), [total, options.offset])

	const nextPage = useCallback(() => {
		const increment = options.offset + options.limit;
		if (increment > total) console.warn('Paginator: next page is out of range');
		else setOptions({ ...options, offset: increment });
	}, [options, total]);

	const previousPage = useCallback(() => {
		const decrement = options.offset - options.limit;
		if (decrement < 0) console.warn('Paginator: previous page is out of range');
		else setOptions({ ...options, offset: decrement });
	}, [options]);

	const setLimit = useCallback(
		(limit: Paginator['limit']) => setOptions({ ...options, limit })
		, [options]
	)

	return {
		paginator: {
			hasNextPage,
			hasPreviousPage,
			pagesQty,
			setLimit,
			nextPage,
			...options
		}
	}
}
