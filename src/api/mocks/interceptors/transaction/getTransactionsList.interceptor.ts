import { http, HttpResponse } from 'msw'

import { fakeBackend, paginatorExample } from 'api/constants'
import { getTransactionsListContract, GetTransactionsList_RequestQuery, GetTransactionsList_ResponsePayload } from 'api/contracts'
import { parseSearchParameters } from 'utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = getTransactionsListContract

export const getTransactionsList_Interceptor =
	http[method](fakeBackend + route, ({ request }) => {
		const {
			limit = paginatorExample.limit,
			offset = paginatorExample.offset
		} = parseSearchParameters<GetTransactionsList_RequestQuery>(request.url)

		const data = database.transactions.slice(offset, limit)

		return HttpResponse.json<GetTransactionsList_ResponsePayload>(
			{
				count: data.length,
				results: data,
			},
			{
				status: responseExample?.status
			}
		)
	})
