import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteAddonByIdContract, getAddonsListContract } from 'api/contracts'
import { GetAddonById_RouteParams } from 'api/constants'
import { api } from 'configuration'

export const useDeleteAddonByIdMutation = () => {
	const queryClient = useQueryClient()
	const { name, endpoint: { method, route } } = deleteAddonByIdContract

	const deleteAddon = useMutation({
			mutationKey: [name],
			mutationFn: async (routeParams: GetAddonById_RouteParams) => {
				return await api[method](route(routeParams))
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [getAddonsListContract.name] })
			}
		})

	return { deleteAddon }
}
