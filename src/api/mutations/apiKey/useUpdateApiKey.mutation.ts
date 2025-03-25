import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	getApiKeysListContract,
	updateApiKeyByIdContract,
} from 'api/contracts'
import { GetApiKeyById_RouteParams } from 'api/constants'
import { api } from 'configuration'

export const useUpdateApiKeyByIdMutation = () => {
	const queryClient = useQueryClient()
	const { name, endpoint: { method, route } } = updateApiKeyByIdContract

	const updateApiKey = useMutation({
		mutationKey: [name],
		mutationFn: async (routeParams: GetApiKeyById_RouteParams) => {
			return await api[method](route(routeParams))
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [getApiKeysListContract.name] })
		}
	})

	return { updateApiKey }
}
