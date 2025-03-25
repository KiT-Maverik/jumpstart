import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	getCompaniesListContract,
	deleteCompanyByIdContract,

} from 'api/contracts'
import { GetCompanyById_RouteParams } from 'api/constants'
import { api } from 'configuration'

export const useDeleteCompanyByIdMutation = (routeParams: GetCompanyById_RouteParams) => {
	const queryClient = useQueryClient()
	const {name, endpoint: {method, route}} = deleteCompanyByIdContract

	const deleteCompany = useMutation({
			mutationKey: [name],
			mutationFn: async () =>
				await api[method](route(routeParams)),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [getCompaniesListContract.name] })
			},
		})

	return { deleteCompany }
}
