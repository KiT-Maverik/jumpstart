'use client'

import {
	GetTransactionsList_RequestQuery,
	GetTransactionsList_ResponsePayload,
	getTransactionsListContract
} from 'api/contracts'
import { useQueryParamsController, useTypedQuery } from 'api/hooks'
import { TanstackQuery_CustomOptions } from 'api/types/request-hook'
import { api } from 'configuration'

type Options = TanstackQuery_CustomOptions<GetTransactionsList_ResponsePayload>

export const useGetTransactionsListQuery = (
	options: Options = {}
) => {
	const { name, endpoint: { method, route }, defaults } = getTransactionsListContract

	const { additionalQueryKey, ...customOptions } = options

	const queryKey = [name]

	if (additionalQueryKey) queryKey.push(additionalQueryKey)

	const { associateQuery, ...params } = useQueryParamsController<GetTransactionsList_RequestQuery>(defaults.query)

	const query =
		useTypedQuery<GetTransactionsList_ResponsePayload>({
			queryKey,
			queryFn: async () => await api[method](route, { params: params.get() }),
			...customOptions
		})

	associateQuery(query)

	return {
		getTransactionsList: {
			data: query.data?.data,
			params,
			query,
		}
	}
}
