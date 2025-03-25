import { http, HttpResponse } from 'msw'

import { fakeBackend, GetTransactionById_RouteParams } from 'api/constants'
import { GetTransactionById_ResponsePayload, getTransactionByIdContract } from 'api/contracts'
import { notFound_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = getTransactionByIdContract

export const getTransactionById_Interceptor =
	http[method]<GetTransactionById_RouteParams>(fakeBackend + route(), async ({ params: { transaction_id } }) => {
		const indexToRetrieve = database.companies.findIndex(item => item.id === transaction_id)

		if (indexToRetrieve !== -1) {
			return HttpResponse.json<GetTransactionById_ResponsePayload>(
				database.transactions[indexToRetrieve],
				{
					status: responseExample?.status
				}
			)
		} else return notFound_ErrorResponse('Transaction')
	})
