import { Filter } from 'api/schemas'

export const createFilterMock: (filter?: Partial<Omit<Filter, 'id'>>) => Filter = (filter) => ({
	id: crypto.randomUUID(),
	name: filter?.name ?? "Your new filter",
	user_id: crypto.randomUUID(),
	filters: 'filter sting',
})
