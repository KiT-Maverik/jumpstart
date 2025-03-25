import { http, HttpResponse } from 'msw'

import { fakeBackend, paginatorExample } from 'api/constants'
import { getChallengeTypesListContract, GetChallengeTypesList_RequestQuery, GetChallengeTypesList_ResponsePayload } from 'api/contracts'
import { parseSearchParameters } from 'utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = getChallengeTypesListContract

export const getChallengeTypesList_Interceptor =
	http[method](fakeBackend + route, ({ request }) => {
		const {
			limit = paginatorExample.limit,
			offset = paginatorExample.offset
		} = parseSearchParameters<GetChallengeTypesList_RequestQuery>(request.url)

		const data = database.challengeTypes.slice(offset, limit)

		return HttpResponse.json<GetChallengeTypesList_ResponsePayload>(
			{
				count: data.length,
				results: data,
			},
			{
				status: responseExample?.status
			}
		)
	})
