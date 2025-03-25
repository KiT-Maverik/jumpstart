import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	getGroupsListContract,
	createGroupContract,
	CreateGroup_RequestPayload,
	CreateGroup_ResponsePayload,
} from 'api/contracts'
import { api } from 'configuration'
import { RequestExtender } from 'api/types/request-hook'

export const useCreateGroupMutation = (options: RequestExtender) => {
	const queryClient = useQueryClient()
	const {name, endpoint: {method, route}} = createGroupContract

	const createGroup = useMutation({
			mutationKey: [name],
			mutationFn: async (data: CreateGroup_RequestPayload) =>
				await api[method]<CreateGroup_ResponsePayload>(route, data),
			onSuccess: () => {
				if (options.onSuccess) options.onSuccess()

				queryClient.invalidateQueries({ queryKey: [getGroupsListContract.name] })
			},
		})

	return { createGroup }
}
