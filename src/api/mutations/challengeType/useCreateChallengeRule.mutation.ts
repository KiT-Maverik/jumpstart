import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	getChallengeTypesListContract,
	createChallengeTypeContract,
	CreateChallengeType_RequestPayload,
	CreateChallengeType_ResponsePayload,
} from 'api/contracts'
import { api } from 'configuration'

export const useCreateChallengeTypeMutation = () => {
	const queryClient = useQueryClient()
	const {name, endpoint: {method, route}} = createChallengeTypeContract

	const createChallengeType = useMutation({
			mutationKey: [name],
			mutationFn: async (data: CreateChallengeType_RequestPayload) =>
				await api[method]<CreateChallengeType_ResponsePayload>(route, {
					data,
				}),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [getChallengeTypesListContract.name] })
			},
		})

	return { createChallengeType }
}
