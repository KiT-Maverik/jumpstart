import { useQuery } from '@tanstack/react-query'

import { GetChallengeRuleById_ResponsePayload, getChallengeRuleByIdContract } from 'api/contracts'
import { GetChallengeRuleById_RouteParams } from 'api/constants'
import { api } from 'configuration'

export const useGetChallengeRuleByIdQuery = (routeParams: GetChallengeRuleById_RouteParams) => {
	const { name, endpoint: { method, route } } = getChallengeRuleByIdContract

	const getChallengeRuleByIdQuery = useQuery({
			queryKey: [name, routeParams.challenge_rule_id],
			queryFn: async () =>
				await api[method]<GetChallengeRuleById_ResponsePayload>(route(routeParams))
		})

	return { getChallengeRuleByIdQuery }
}
