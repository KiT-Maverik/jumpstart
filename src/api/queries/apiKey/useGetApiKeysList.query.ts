import { useQuery } from '@tanstack/react-query'

import {
	getApiKeysListContract,
	GetApiKeysList_ResponsePayload,
	GetApiKeysList_RequestQuery,
} from 'api/contracts'
import { api } from 'configuration'

export const useGetApiKeysListQuery = () => {
	const { name, endpoint: { method, route } } = getApiKeysListContract

	const params: GetApiKeysList_RequestQuery = {
		limit: 0,
		offset: 0,
	}
	const getApiKeysListQuery = useQuery({
			queryKey: [name],
			queryFn: async () =>
				await api[method]<GetApiKeysList_ResponsePayload>(route, { params })
		})

	return { getApiKeysListQuery, apiKeysList: getApiKeysListQuery.data?.data.results || [] }
}
