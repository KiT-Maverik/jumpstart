import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	getAddonsListContract,
	updateAddonByIdContract,
} from 'api/contracts'
import { GetAddonById_RouteParams } from 'api/constants'
import { api } from 'configuration'

export const useUpdateAddonByIdMutation = () => {
	const queryClient = useQueryClient()
	const { name, endpoint: { method, route } } = updateAddonByIdContract

	const updateAddon = useMutation({
		mutationKey: [name],
		mutationFn: async (routeParams: GetAddonById_RouteParams) => {
			return await api[method](route(routeParams))
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [getAddonsListContract.name] })
		}
	})

	return { updateAddon }
}
