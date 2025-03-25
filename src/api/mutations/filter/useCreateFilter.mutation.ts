import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	getCompaniesListContract,
	createFilterContract,
	CreateFilter_RequestPayload,
	CreateFilter_ResponsePayload,
} from 'api/contracts'
import { api } from 'configuration'

export const useCreateFilterMutation = () => {
	const queryClient = useQueryClient()
	const {name, endpoint:{method, route}} = createFilterContract

	const createFilter = useMutation({
			mutationKey: [name],
			mutationFn: async (data: CreateFilter_RequestPayload) =>
				await api[method]<CreateFilter_ResponsePayload>(route, {
					data,
				}),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [getCompaniesListContract.name] })
			},
		})

	return { createFilter }
}
