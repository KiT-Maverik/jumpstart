import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	getApiKeysListContract,
	createApiKeyContract,
	CreateApiKey_RequestPayload,
	CreateApiKey_ResponsePayload
} from 'api/contracts'
import { RequestExtender } from 'api/types/request-hook'
import { api } from 'configuration'
import { useToast } from 'configuration/store'

export const useCreateApiKeyMutation = (options: RequestExtender<CreateApiKey_ResponsePayload> = {}) => {
	const queryClient = useQueryClient()
	const { showToast } = useToast()

	const {name, endpoint: {method, route}} = createApiKeyContract

	const createApiKey = useMutation({
			mutationKey: [name],
			mutationFn: async (data: CreateApiKey_RequestPayload) =>
				await api[method]<CreateApiKey_ResponsePayload>(route, data),
			onSuccess: () => {
				if (options.onSuccess) options.onSuccess()
				showToast({message: `Successfully created api key`, type: 'success'})
				queryClient.invalidateQueries({ queryKey: [getApiKeysListContract.name] })
			},
		})

	return { createApiKey }
}
