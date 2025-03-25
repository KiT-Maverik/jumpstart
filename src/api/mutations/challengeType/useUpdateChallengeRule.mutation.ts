import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	getChallengeTypesListContract,
	updateChallengeTypeByIdContract,
	UpdateChallengeTypeById_RequestPayload,
	UpdateChallengeTypeById_ResponsePayload,
} from 'api/contracts'
import { GetChallengeTypeById_RouteParams } from 'api/constants'
import { api } from 'configuration'

export const useUpdateChallengeTypeMutation = (routeParams: GetChallengeTypeById_RouteParams) => {
	const queryClient = useQueryClient()
	const {name, endpoint: {method, route}} = updateChallengeTypeByIdContract

	const updateChallengeType = useMutation({
			mutationKey: [name],
			mutationFn: async (data: UpdateChallengeTypeById_RequestPayload) =>
				await api[method]<UpdateChallengeTypeById_ResponsePayload>(route(routeParams), {
					data,
				}),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [getChallengeTypesListContract.name] })
			},
		})

	return { updateChallengeType }
}
