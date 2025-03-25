import { useQuery } from '@tanstack/react-query'

import {
	getCompaniesListContract,
	GetCompaniesList_RequestQuery,
	GetCompaniesList_ResponsePayload
} from 'api/contracts'
import { api } from 'configuration'

export const useGetCompaniesListQuery = () => {
	const { name, endpoint: { method, route } } = getCompaniesListContract

	const params: GetCompaniesList_RequestQuery = {
		offset: 0,
		limit: 10,
	}

	const getCompaniesListQuery = useQuery({
			queryKey: [name],
			queryFn: async () =>
				await api[method]<GetCompaniesList_ResponsePayload>(route, { params })
		})

	return { getCompaniesListQuery, companiesList: getCompaniesListQuery.data?.data.results || [] }
}
