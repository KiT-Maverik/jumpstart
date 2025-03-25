import { useQuery } from '@tanstack/react-query'

import { api } from 'configuration'
import { GetGroupById_ResponsePayload, getGroupByIdContract } from 'api/contracts'
import { GetGroupById_RouteParams } from 'api/constants'

export const useGetGroupByIdQuery = (routeParams: GetGroupById_RouteParams) => {
	const { name, endpoint: { method, route } } = getGroupByIdContract

	const getGroupByIdQuery = useQuery({
			queryKey: [name, routeParams.group_id],
			queryFn: async () =>
				await api[method]<GetGroupById_ResponsePayload>(route(routeParams))
		})

	return { getGroupByIdQuery }
}
