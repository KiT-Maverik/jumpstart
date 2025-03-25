import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteChallengeTypeByIdContract, getChallengeTypesListContract } from 'api/contracts'
import { GetChallengeTypeById_RouteParams } from 'api/constants'
import { api } from 'configuration'

export const useDeleteChallengeTypeByIdMutation = (routeParams: GetChallengeTypeById_RouteParams) => {
	const queryClient = useQueryClient()
	const { name, endpoint: { method, route } } = deleteChallengeTypeByIdContract

	const deleteChallengeType = useMutation({
		mutationKey: [name],
		mutationFn: async () =>
			await api[method](route(routeParams)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [getChallengeTypesListContract.name] })
		}
	})

	return { deleteChallengeType }
}
