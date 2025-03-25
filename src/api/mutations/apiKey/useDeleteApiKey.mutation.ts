import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DeleteApiKeyById_Response, deleteApiKeyByIdContract, getApiKeysListContract } from 'api/contracts'
import { GetApiKeyById_RouteParams } from 'api/constants'
import { api } from 'configuration'
import { useToast } from 'configuration/store'
import { RequestExtender } from 'api/types/request-hook'

export const useDeleteApiKeyByIdMutation = (options: RequestExtender<DeleteApiKeyById_Response>) => {
	const queryClient = useQueryClient()
	const { showToast } = useToast()

	const { name, endpoint: { method, route } } = deleteApiKeyByIdContract

	const deleteApiKey = useMutation({
			mutationKey: [name],
			mutationFn: async (routeParams: GetApiKeyById_RouteParams) => {
				return await api[method](route(routeParams))
			},
			onSuccess: () => {
				if (options?.onSuccess) options.onSuccess()
				showToast({ message: 'API key deleted', type: 'info' })
				queryClient.invalidateQueries({ queryKey: [getApiKeysListContract.name] })
			}
		})

	return { deleteApiKey }
}
