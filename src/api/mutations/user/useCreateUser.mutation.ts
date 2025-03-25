import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	getUsersListContract,
	createUserContract,
	CreateUser_RequestPayload,
	CreateUser_ResponsePayload,
} from 'api/contracts'
import { api } from 'configuration'

export const useCreateUserMutation = () => {
	const queryClient = useQueryClient()
	const {name, endpoint: {method, route}} = createUserContract

	const createUser = useMutation({
			mutationKey: [name],
			mutationFn: async (data: CreateUser_RequestPayload) =>
				await api[method]<CreateUser_ResponsePayload>(route, {
					data,
				}),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [getUsersListContract.name] })
			},
		})

	return { createUser }
}
