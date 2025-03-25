import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	getTransactionsListContract,
	removeTransactionFromGroupContract,
	RemoveTransactionFromGroup_ResponsePayload,
} from 'api/contracts'
import { RemoveTransactionFromGroup_RouteParams } from 'api/constants'
import { api } from 'configuration'

export const useRemoveTransactionFromGroup = (params: RemoveTransactionFromGroup_RouteParams) => {
	const queryClient = useQueryClient()
	const {name, endpoint: {method, route}} = removeTransactionFromGroupContract

	const RemoveTransactionFromGroup = useMutation({
			mutationKey: [name],
			mutationFn: async () =>
				await api[method]<RemoveTransactionFromGroup_ResponsePayload>(route(params)),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [getTransactionsListContract.name] })
			},
		})

	return { RemoveTransactionFromGroup }
}
