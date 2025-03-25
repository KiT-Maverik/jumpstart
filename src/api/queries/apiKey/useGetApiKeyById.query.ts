import { useQuery } from '@tanstack/react-query'

import { getApiKeyByIdContract, GetApiKeyById_ResponsePayload } from 'api/contracts'
import { GetApiKeyById_RouteParams } from 'api/constants'
import { api } from 'configuration'

export const useGetApiKeyByIdQuery = (routeParams: GetApiKeyById_RouteParams) => {
	const { name, endpoint: {method, route} } = getApiKeyByIdContract

	const getApiKeyById = useQuery({
			queryKey: [name, routeParams.key_id],
			queryFn: async () =>
				await api[method]<GetApiKeyById_ResponsePayload>(route(routeParams))
		})

	return { getApiKeyById }
}
