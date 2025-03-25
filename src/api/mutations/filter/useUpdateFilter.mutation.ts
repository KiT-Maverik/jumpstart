import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	getCompaniesListContract,
	updateFilterByIdContract,
	UpdateFilterById_RequestPayload,
	UpdateFilterById_ResponsePayload,
} from 'api/contracts'
import { api } from 'configuration'
import { GetFilterById_RouteParams } from 'api/constants'

export const useUpdateFilterMutation = (routeParams: GetFilterById_RouteParams) => {
	const queryClient = useQueryClient()
	const {name, endpoint: {method, route}} = updateFilterByIdContract

	const updateFilter = useMutation({
			mutationKey: [name],
			mutationFn: async (data: UpdateFilterById_RequestPayload) =>
				await api[method]<UpdateFilterById_ResponsePayload>(route(routeParams), {
					data,
				}),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [getCompaniesListContract.name] })
			},
		})

	return { updateFilter }
}
