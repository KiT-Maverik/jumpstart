import { http, HttpResponse } from 'msw'

import { fakeBackend, GetChallengeRuleById_RouteParams } from 'api/constants'
import { getChallengeRuleByIdContract, GetChallengeRuleById_ResponsePayload } from 'api/contracts'

import { database } from 'api/mocks/database'
import { notFound_ErrorResponse } from 'api/utils'

const { endpoint: { method, route }, responseExample } = getChallengeRuleByIdContract

export const getChallengeRuleById_Interceptor =
	http[method]<GetChallengeRuleById_RouteParams>(fakeBackend + route(), async ({ params: { challenge_rule_id } }) => {
		const indexToRetrieve = database.challengeRules.findIndex(item => item.id === challenge_rule_id)

		if (indexToRetrieve !== -1) {
			return HttpResponse.json<GetChallengeRuleById_ResponsePayload>(
				database.challengeRules[indexToRetrieve],
				{
					status: responseExample?.status
				}
			)
		} else return notFound_ErrorResponse('Challenge rule')
	})
