import { useQuery } from '@tanstack/react-query'

import { GetUserById_ResponsePayload, getUserByIdContract } from 'api/contracts'
import { GetUserById_RouteParams } from 'api/constants'
import { api } from 'configuration'

export const useGetUserByIdQuery = (routeParams: GetUserById_RouteParams) => {
	const { name, endpoint: { method, route } } = getUserByIdContract

	const getUserByIdQuery = useQuery({
			queryKey: [name, routeParams.user_id],
			queryFn: async () =>
				await api[method]<GetUserById_ResponsePayload>(route(routeParams))
		})

	return { getUserByIdQuery }
}
