import { http, HttpResponse } from 'msw'

import { fakeBackend , paginatorExample} from 'api/constants'
import { getGroupsListContract, GetGroupsList_RequestQuery, GetGroupsList_ResponsePayload } from 'api/contracts'
import { parseSearchParameters } from 'utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = getGroupsListContract

export const getGroupsList_Interceptor =
	http[method](fakeBackend + route, ({ request }) => {
		const {
			limit = paginatorExample.limit,
			offset = paginatorExample.offset
		} = parseSearchParameters<GetGroupsList_RequestQuery>(request.url)

		const data = database.groups.slice(offset, limit)

		return HttpResponse.json<GetGroupsList_ResponsePayload>(
			{
				count: data.length,
				results: data,
			},
			{
				status: responseExample?.status
			}
		)
	})
