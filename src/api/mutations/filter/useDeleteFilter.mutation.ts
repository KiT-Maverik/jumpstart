import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	getCompaniesListContract,
	deleteFilterByIdContract,
} from 'api/contracts'
import { GetFilterById_RouteParams } from 'api/constants'
import { api } from 'configuration'

export const useDeleteFilterByIdMutation = (routeParams: GetFilterById_RouteParams) => {
	const queryClient = useQueryClient()
	const {name, endpoint: {method, route}} = deleteFilterByIdContract

	const deleteFilter = useMutation({
			mutationKey: [name],
			mutationFn: async () =>
				await api[method](route(routeParams)),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [getCompaniesListContract.name] })
			},
		})

	return { deleteFilter }
}
