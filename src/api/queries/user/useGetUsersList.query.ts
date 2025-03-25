import { useQuery } from '@tanstack/react-query'

import { api } from 'configuration'
import {
	GetUsersList_RequestQuery,
	GetUsersList_ResponsePayload,
	getUsersListContract
} from 'api/contracts'

export const useGetUsersListQuery = (query: GetUsersList_RequestQuery) => {
	const { name, endpoint: { method, route } } = getUsersListContract

	const getUsersListQuery = useQuery({
			queryKey: [name],
			queryFn: async () =>
				await api[method]<GetUsersList_ResponsePayload>(route, { query })
		})

	return { getUsersListQuery }
}
