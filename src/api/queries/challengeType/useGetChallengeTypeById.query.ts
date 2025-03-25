import { useQuery } from '@tanstack/react-query'

import { GetChallengeTypeById_ResponsePayload, getChallengeTypeByIdContract } from 'api/contracts'
import { GetChallengeTypeById_RouteParams } from 'api/constants'
import { api } from 'configuration'

export const useGetChallengeTypeByIdQuery = (routeParams: GetChallengeTypeById_RouteParams) => {
	const { name, endpoint: { method, route } } = getChallengeTypeByIdContract

	const getChallengeTypeByIdQuery = useQuery({
			queryKey: [name, routeParams.challenge_type_id],
			queryFn: async () =>
				await api[method]<GetChallengeTypeById_ResponsePayload>(route(routeParams))
		})

	return { getChallengeTypeByIdQuery }
}
