import { Paginator } from 'api/schemas'

export const normalizePaginatorQuery = (paginator: Paginator): Paginator => ({
	limit: paginator.limit ?? 10,
	offset: paginator.offset ?? 0
})
