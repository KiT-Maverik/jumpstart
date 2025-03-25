import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteChallengeRuleByIdContract, getChallengeRulesListContract } from 'api/contracts'
import { GetChallengeRuleById_RouteParams } from 'api/constants'
import { api } from 'configuration'

export const useDeleteChallengeRuleByIdMutation = (routeParams: GetChallengeRuleById_RouteParams) => {
	const queryClient = useQueryClient()
	const { name, endpoint: { method, route } } = deleteChallengeRuleByIdContract

	const deleteChallengeRule = useMutation({
		mutationKey: [name],
		mutationFn: async () =>
			await api[method](route(routeParams)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [getChallengeRulesListContract.name] })
		}
	})

	return { deleteChallengeRule }
}
