import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	getChallengeRulesListContract,
	updateChallengeRuleByIdContract,
	UpdateChallengeRuleById_RequestPayload,
	UpdateChallengeRuleById_ResponsePayload,
} from 'api/contracts'
import { GetChallengeRuleById_RouteParams } from 'api/constants'
import { api } from 'configuration'

export const useUpdateChallengeRuleMutation = (routeParams: GetChallengeRuleById_RouteParams) => {
	const queryClient = useQueryClient()
	const {name, endpoint: {method, route}} = updateChallengeRuleByIdContract

	const updateChallengeRule = useMutation({
			mutationKey: [name],
			mutationFn: async (data: UpdateChallengeRuleById_RequestPayload) =>
				await api[method]<UpdateChallengeRuleById_ResponsePayload>(route(routeParams), {
					data,
				}),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [getChallengeRulesListContract.name] })
			},
		})

	return { updateChallengeRule }
}
