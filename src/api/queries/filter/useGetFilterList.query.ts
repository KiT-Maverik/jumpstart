import { useQuery } from '@tanstack/react-query'

import {
	getFiltersListContract,
	GetFiltersList_RequestQuery,
	GetFiltersList_ResponsePayload,
} from 'api/contracts'
import { api } from 'configuration'

export const useGetFilterListQuery = (params: GetFiltersList_RequestQuery) => {
	const { name, endpoint: { method, route } } = getFiltersListContract

	const getFiltersListQuery = useQuery({
			queryKey: [name],
			queryFn: async () =>
				await api[method]<GetFiltersList_ResponsePayload>(route, { params })
		})

	return { getFiltersListQuery }
}
