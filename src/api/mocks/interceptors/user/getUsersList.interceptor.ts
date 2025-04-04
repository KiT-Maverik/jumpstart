import { http, HttpResponse } from 'msw'

import { fakeBackend, defaultPaginator } from 'api/constants'
import { getUsersListContract, GetUsersList_RequestQuery, GetUsersList_ResponsePayload } from 'api/contracts'
import { parseSearchParameters } from 'utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = getUsersListContract

export const getUsersList_Interceptor =
	http[method](fakeBackend + route, ({ request }) => {
		const {
			limit = defaultPaginator.limit,
			offset = defaultPaginator.offset
		} = parseSearchParameters<GetUsersList_RequestQuery>(request.url)

		const data = database.users.slice(offset, limit)

		return HttpResponse.json<GetUsersList_ResponsePayload>(
			{
				count: data.length,
				results: data,
			},
			{
				status: responseExample?.status
			}
		)
	})
