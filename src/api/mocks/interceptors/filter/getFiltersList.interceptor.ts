import { http, HttpResponse } from 'msw'

import { fakeBackend, defaultPaginator } from 'api/constants'
import { getFiltersListContract, GetFiltersList_RequestQuery, GetFiltersList_ResponsePayload } from 'api/contracts'
import { parseSearchParameters } from 'utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = getFiltersListContract

export const getFiltersList_Interceptor =
	http[method](fakeBackend + route, ({ request }) => {
		const {
			limit = defaultPaginator.limit,
			offset = defaultPaginator.offset
		} = parseSearchParameters<GetFiltersList_RequestQuery>(request.url)

		const data = database.filters.slice(offset, limit)

		return HttpResponse.json<GetFiltersList_ResponsePayload>(
			{
				count: data.length,
				results: data,
			},
			{
				status: responseExample?.status
			}
		)
	})
