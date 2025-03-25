import { useQueryClient } from '@tanstack/react-query'

import {
	getGroupsListContract,
	updateGroupByIdContract,
	UpdateGroupById_RequestPayload,
	UpdateGroupById_ResponsePayload
} from 'api/contracts'
import { useTypedMutation } from 'api/hooks'
import { Id } from 'api/schemas'
import { api } from 'configuration'

export const useUpdateGroupMutation = () => {
	const queryClient = useQueryClient()
	const { name, endpoint: { method, route } } = updateGroupByIdContract

	const updateGroup =
		useTypedMutation<
			UpdateGroupById_ResponsePayload,
			{ id: Id } & UpdateGroupById_RequestPayload
		>({
			mutationKey: [name],
			mutationFn: async ({ id, ...updatedGroup }) =>
				await api[method](
					route({ group_id: id }),
					updatedGroup
				),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [getGroupsListContract.name] })
			}
		})

	return { updateGroup }
}
