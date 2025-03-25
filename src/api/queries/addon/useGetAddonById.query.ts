import { useQuery } from '@tanstack/react-query'

import { getAddonByIdContract, GetAddonById_ResponsePayload } from 'api/contracts'
import { GetAddonById_RouteParams } from 'api/constants'
import { api } from 'configuration'

export const useGetAddonByIdQuery = (routeParams: GetAddonById_RouteParams) => {
	const { name, endpoint: {method, route} } = getAddonByIdContract

	const getAddonByIdQuery = useQuery({
			queryKey: [name, routeParams.addon_id],
			queryFn: async () =>
				await api[method]<GetAddonById_ResponsePayload>(route(routeParams))
		})

	return { getAddonByIdQuery }
}
