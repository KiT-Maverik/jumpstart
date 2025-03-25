import { useQuery } from '@tanstack/react-query'

import {
	getAddonsListContract,
	GetAddonList_Query,
	GetAddonList_ResponsePayload,
} from 'api/contracts'
import { api } from 'configuration'

export const useGetAddonsListQuery = () => {
	const { name, endpoint: { method, route } } = getAddonsListContract

	const params: GetAddonList_Query = {
		limit: 0,
		offset: 0,
	}
	const getAddonsListQuery = useQuery({
			queryKey: [name],
			queryFn: async () =>
				await api[method]<GetAddonList_ResponsePayload>(route, { params })
		})

	return { getAddonsListQuery, addonsList: getAddonsListQuery.data?.data.results || [] }
}
