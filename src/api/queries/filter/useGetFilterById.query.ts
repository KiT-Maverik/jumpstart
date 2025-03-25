import { useQuery } from '@tanstack/react-query'

import { GetFilterById_ResponsePayload, getFilterByIdContract } from 'api/contracts'
import { GetFilterById_RouteParams } from 'api/constants'
import { api } from 'configuration'

export const useGetFilterByIdQuery = (routeParams: GetFilterById_RouteParams) => {
	const { name, endpoint: { method, route } } = getFilterByIdContract

	const getFilterByIdQuery = useQuery({
			queryKey: [name, routeParams.filter_id],
			queryFn: async () =>
				await api[method]<GetFilterById_ResponsePayload>(route(routeParams))
		})

	return { getFilterByIdQuery }
}
