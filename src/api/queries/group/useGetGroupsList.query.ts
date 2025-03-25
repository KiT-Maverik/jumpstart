import { useQuery } from '@tanstack/react-query'

import { api } from 'configuration'
import {
	GetGroupsList_RequestQuery,
	GetGroupsList_ResponsePayload,
	getGroupsListContract,
} from 'api/contracts'

export const useGetGroupsListQuery = () => {
	const { name, endpoint: { method, route } } = getGroupsListContract

	const params: GetGroupsList_RequestQuery = {
		limit: 10,
		offset: 0
	}

	const getGroupsListQuery = useQuery({
			queryKey: [name],
			queryFn: async () =>
				await api[method]<GetGroupsList_ResponsePayload>(route, { params })
		})

	const groupsList = getGroupsListQuery.data?.data.results ?? []

	return { getGroupsListQuery, groupsList }
}
