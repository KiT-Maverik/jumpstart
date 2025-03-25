import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	getCompaniesListContract,
	createCompanyContract,
	CreateCompany_RequestPayload,
	CreateCompany_ResponsePayload,
} from 'api/contracts'
import { api } from 'configuration'

export const useCreateCompanyMutation = () => {
	const queryClient = useQueryClient()
	const {name, endpoint:{method, route}} = createCompanyContract

	const createCompany = useMutation({
			mutationKey: [name],
			mutationFn: async (data: CreateCompany_RequestPayload) =>
				await api[method]<CreateCompany_ResponsePayload>(route, {
					data,
				}),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [getCompaniesListContract.name] })
			},
		})

	return { createCompany }
}
