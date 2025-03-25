import { Paginator } from 'api/schemas'

export const createPaginatorSuffixes = ({ limit, offset }: Paginator) => [
	`Limit: ${limit}`,
	`Offset: ${offset}`
]
