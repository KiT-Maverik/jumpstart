import { useQuery } from '@tanstack/react-query'

import { GetCompanyById_ResponsePayload, getCompanyByIdContract } from 'api/contracts'
import { GetCompanyById_RouteParams } from 'api/constants'
import { api } from 'configuration'

export const useGetCompanyByIdQuery = (routeParams: GetCompanyById_RouteParams) => {
	const { name, endpoint: { method, route } } = getCompanyByIdContract

	const getCompanyByIdQuery = useQuery({
			queryKey: [name, routeParams.company_id],
			queryFn: async () =>
				await api[method]<GetCompanyById_ResponsePayload>(route(routeParams))
		})

	return { getCompanyByIdQuery }
}
