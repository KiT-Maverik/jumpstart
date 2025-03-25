import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	getUsersListContract,
	deleteUserByIdContract,
} from 'api/contracts'
import { GetUserById_RouteParams } from 'api/constants'
import { api } from 'configuration'

export const useDeleteUserByIdMutation = (routeParams: GetUserById_RouteParams) => {
	const queryClient = useQueryClient()
	const {name, endpoint: {method, route}} = deleteUserByIdContract

	const deleteUser = useMutation({
			mutationKey: [name],
			mutationFn: async () =>
				await api[method](route(routeParams)),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [getUsersListContract.name] })
			},
		})

	return { deleteUser }
}
