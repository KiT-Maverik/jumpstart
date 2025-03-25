import { useQuery } from '@tanstack/react-query'

import { GetTransactionById_ResponsePayload, getTransactionByIdContract } from 'api/contracts'
import { GetTransactionById_RouteParams } from 'api/constants'
import { api } from 'configuration'

export const useGetTransactionByIdQuery = (params: GetTransactionById_RouteParams) => {
	const { name, endpoint: { method, route } } = getTransactionByIdContract

	const getTransactionByIdQuery = useQuery({
			queryKey: [name, params.transaction_id],
			queryFn: async () =>
				await api[method]<GetTransactionById_ResponsePayload>(route(params)),

		})

	return { getTransactionByIdQuery }
}
