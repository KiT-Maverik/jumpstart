import { http, HttpResponse } from 'msw'

import { fakeBackend, paginatorExample } from 'api/constants'
import { getAddonsListContract, GetAddonList_Query, GetAddonList_ResponsePayload } from 'api/contracts'
import { parseSearchParameters } from 'utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = getAddonsListContract

export const getChallengesList_Interceptor =
	http[method](fakeBackend + route, ({ request }) => {
		const {
			limit = paginatorExample.limit,
			offset = paginatorExample.offset
		} = parseSearchParameters<GetAddonList_Query>(request.url)

		const data = database.challenges.slice(offset, limit)

		return HttpResponse.json<GetAddonList_ResponsePayload>(
			{
				count: data.length,
				results: data,
			},
			{
				status: responseExample?.status
			}
		)
	})
