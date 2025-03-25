import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	getCompaniesListContract,
	updateCompanyByIdContract,
	UpdateCompanyById_RequestPayload,
	UpdateCompanyById_ResponsePayload,
} from 'api/contracts'
import { api } from 'configuration'
import { GetCompanyById_RouteParams } from 'api/constants'

export const useUpdateCompanyMutation = (routeParams: GetCompanyById_RouteParams) => {
	const queryClient = useQueryClient()
	const {name, endpoint: {method, route}} = updateCompanyByIdContract

	const updateCompany = useMutation({
			mutationKey: [name],
			mutationFn: async (data: UpdateCompanyById_RequestPayload) =>
				await api[method]<UpdateCompanyById_ResponsePayload>(route(routeParams), {
					data,
				}),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [getCompaniesListContract.name] })
			},
		})

	return { updateCompany }
}
