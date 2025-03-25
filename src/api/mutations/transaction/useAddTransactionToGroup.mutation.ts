import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
	getTransactionsListContract,
	addTransactionToGroupContract,
	AddTransactionToGroup_ResponsePayload,
} from 'api/contracts'
import { AddTransactionToGroup_RouteParams } from 'api/constants'
import { api } from 'configuration'

export const useAddTransactionToGroupMutation = (params: AddTransactionToGroup_RouteParams) => {
	const queryClient = useQueryClient()
	const {name, endpoint: {method, route}} = addTransactionToGroupContract

	const addTransactionToGroup = useMutation({
			mutationKey: [name],
			mutationFn: async () =>
				await api[method]<AddTransactionToGroup_ResponsePayload>(route(params)),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [getTransactionsListContract.name] })
			},
		})

	return { addTransactionToGroup }
}
