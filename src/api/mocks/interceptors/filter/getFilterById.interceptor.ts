import { http, HttpResponse } from 'msw'

import { fakeBackend, GetFilterById_RouteParams } from 'api/constants'
import { GetFilterById_ResponsePayload, getFilterByIdContract } from 'api/contracts'
import { notFound_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = getFilterByIdContract

export const getFilterById_Interceptor =
	http[method]<GetFilterById_RouteParams>(fakeBackend + route(), async ({ params: { filter_id } }) => {
		const indexToRetrieve = database.companies.findIndex(item => item.id === filter_id)

		if (indexToRetrieve !== -1) {
			return HttpResponse.json<GetFilterById_ResponsePayload>(
				database.filters[indexToRetrieve],
				{
					status: responseExample?.status
				}
			)
		} else return notFound_ErrorResponse('Filter')
	})
