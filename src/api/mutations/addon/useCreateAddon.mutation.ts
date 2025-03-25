import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	getAddonsListContract,
	createAddonContract,
	CreateAddon_RequestPayload,
	CreateAddon_ResponsePayload
} from 'api/contracts'
import { api } from 'configuration'

export const useCreateAddonMutation = () => {
	const queryClient = useQueryClient()
	const {name, endpoint: {method, route}} = createAddonContract

	const createAddon = useMutation({
			mutationKey: [name],
			mutationFn: async (data: CreateAddon_RequestPayload) =>
				await api[method]<CreateAddon_ResponsePayload>(route, {
					data,
				}),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [getAddonsListContract.name] })
			},
		})

	return { createAddon }
}
