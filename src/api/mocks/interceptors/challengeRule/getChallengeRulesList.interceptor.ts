import { http, HttpResponse } from 'msw'

import { fakeBackend, paginatorExample } from 'api/constants'
import { getChallengeRulesListContract, GetChallengeRulesList_RequestQuery, GetChallengeRulesList_ResponsePayload } from 'api/contracts'
import { parseSearchParameters } from 'utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = getChallengeRulesListContract

export const getChallengeRulesList_Interceptor =
	http[method](fakeBackend + route, ({ request }) => {
		const {
			limit = paginatorExample.limit,
			offset = paginatorExample.offset
		} = parseSearchParameters<GetChallengeRulesList_RequestQuery>(request.url)

		const data = database.challengeRules.slice(offset, limit)

		return HttpResponse.json<GetChallengeRulesList_ResponsePayload>(
			{
				count: data.length,
				results: data,
			},
			{
				status: responseExample?.status
			}
		)
	})
