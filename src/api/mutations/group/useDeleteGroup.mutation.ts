import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	getGroupsListContract,
	deleteGroupByIdContract
} from 'api/contracts'
import { GetGroupById_RouteParams } from 'api/constants'
import { api } from 'configuration'
import { useToast } from 'configuration/store'
import { RequestExtender } from 'api/types/request-hook'

// TODO: Introduce options in mutations
export const useDeleteGroupByIdMutation = (options: RequestExtender<undefined>) => {
	const queryClient = useQueryClient()
	const { name, endpoint: { method, route } } = deleteGroupByIdContract
	const { showToast } = useToast()

	const { onSuccess, onError } = options

	const deleteGroup = useMutation({
		mutationKey: [name],
		mutationFn: async (routeParams: GetGroupById_RouteParams) =>
			await api[method](route(routeParams)),
		onSuccess: () => {
			if (onSuccess) onSuccess()

			showToast({ message: 'Group deleted', type: 'info' })
			queryClient.invalidateQueries({ queryKey: [getGroupsListContract.name] })
		},
		onError: () => {
			if (onError) onError()
			showToast({ message: 'Can\'t delete group', type: 'error' })
		}
	})

	return { deleteGroup }
}
