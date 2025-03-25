import { http, HttpResponse } from 'msw'

import { fakeBackend, GetChallengeRuleById_RouteParams } from 'api/constants'
import {
	UpdateChallengeRuleById_RequestPayload,
	UpdateChallengeRuleById_ResponsePayload,
	updateChallengeRuleByIdContract
} from 'api/contracts'
import { notFound_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = updateChallengeRuleByIdContract

export const updateChallengeRule_Interceptor =
	http[method]<GetChallengeRuleById_RouteParams, UpdateChallengeRuleById_RequestPayload>(fakeBackend + route(), async ({
																													 request,
																													 params: { challenge_rule_id }
																												 }) => {
		const data = await request.json()

		const indexToUpdate = database.challenges.findIndex(item => item.id === challenge_rule_id)

		if (indexToUpdate !== -1) {
			database.challengeRules[indexToUpdate] = {
				...database.challengeRules[indexToUpdate],
				...data
			}
			return HttpResponse.json<UpdateChallengeRuleById_ResponsePayload>(database.challengeRules[indexToUpdate], {
				status: responseExample?.status
			})
		} else return notFound_ErrorResponse('Challenge rule')
	})
