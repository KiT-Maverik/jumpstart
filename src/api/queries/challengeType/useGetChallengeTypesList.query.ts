import { useQuery } from '@tanstack/react-query'

import { api } from 'configuration'
import {
	GetChallengeTypesList_RequestQuery,
	GetChallengeTypesList_ResponsePayload,
	getChallengeTypesListContract,
} from 'api/contracts'

export const useGetChallengeTypesListQuery = () => {
	const { name, endpoint: { method, route } } = getChallengeTypesListContract

	const params: GetChallengeTypesList_RequestQuery = {
		limit: 0,
		offset: 0,
	}

	const getChallengeTypesListQuery = useQuery({
			queryKey: [name],
			queryFn: async () =>
				await api[method]<GetChallengeTypesList_ResponsePayload>(route, { params })
		})

	return { getChallengeTypesListQuery, challengeTypesList: getChallengeTypesListQuery.data?.data.results || [] }
}
