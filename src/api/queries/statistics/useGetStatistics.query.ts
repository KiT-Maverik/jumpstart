import { useQuery } from '@tanstack/react-query'

import { getStatisticsContract, GetStatistics_ResponsePayload, GetStatistics_QueryParams } from 'api/contracts'
import { api } from 'configuration'

export const useGetStatisticsQuery = (params?: GetStatistics_QueryParams) => {
	const { endpoint: {method, route}, name } = getStatisticsContract

	const getStatistics = useQuery({
		queryKey: [name],
		queryFn: async ({}) =>
			await api[method]<GetStatistics_ResponsePayload>(
				`${route}?${new URLSearchParams(params).toString()}`,
				{params}
			),
	})

	return {
		getStatistics,
	}
}
