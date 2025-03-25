import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { api } from 'configuration'
import {
	GetChallengeRulesList_RequestQuery,
	GetChallengeRulesList_ResponsePayload,
	getChallengeRulesListContract
} from 'api/contracts'
import { AxiosResponse } from 'axios'

export const useGetChallengeRulesListQuery = (params: GetChallengeRulesList_RequestQuery, options?: Omit<UseQueryOptions, 'queryKey' | 'queryFn'>) => {
	const { name, endpoint: { method, route } } = getChallengeRulesListContract

	console.log(options)
	const getChallengeRulesListQuery = useQuery<AxiosResponse<GetChallengeRulesList_ResponsePayload>>({
		queryKey: [name, `Company: ${params.company_id}`, `Limit: ${params.limit}`, `Offset: ${params.offset}`],
		queryFn: async () =>
			await api[method](route, { params }),
	})

	return { getChallengeRulesListQuery, challengeRules: getChallengeRulesListQuery.data?.data.results ?? [] }
}

// todo type q and m
// todo pass options as config
// todo implement behavior extenders
