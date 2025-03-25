import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	getUsersListContract,
	updateUserByIdContract,
	UpdateUserById_Request,
	UpdateUserById_Response,
} from 'api/contracts'
import { api } from 'configuration'
import { GetUserById_RouteParams } from 'api/constants'

export const useUpdateUserMutation = (routeParams: GetUserById_RouteParams) => {
	const queryClient = useQueryClient()
	const {name, endpoint: {method, route}} = updateUserByIdContract

	const updateUser = useMutation({
			mutationKey: [name],
			mutationFn: async (data: UpdateUserById_Request) =>
				await api[method]<UpdateUserById_Response>(route(routeParams), {
					data,
				}),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [getUsersListContract.name] })
			},
		})

	return { updateUser }
}
