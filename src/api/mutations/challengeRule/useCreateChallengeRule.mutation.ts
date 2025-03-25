import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	getChallengeRulesListContract,
	createChallengeRuleContract,
	CreateChallengeRule_RequestPayload,
	CreateChallengeRule_ResponsePayload,
} from 'api/contracts'
import { api } from 'configuration'

export const useCreateChallengeRuleMutation = () => {
	const queryClient = useQueryClient()
	const {name, endpoint: {method, route}} = createChallengeRuleContract

	const createChallengeRule = useMutation({
			mutationKey: [name],
			mutationFn: async (data: CreateChallengeRule_RequestPayload) =>
				await api[method]<CreateChallengeRule_ResponsePayload>(route, {
					data,
				}),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [getChallengeRulesListContract.name] })
			},
		})

	return { createChallengeRule }
}
