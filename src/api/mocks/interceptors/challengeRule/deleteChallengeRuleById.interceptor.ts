import { http, HttpResponse } from 'msw'

import { fakeBackend, GetChallengeRuleById_RouteParams } from 'api/constants'
import { deleteChallengeRuleByIdContract } from 'api/contracts'
import { notFound_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = deleteChallengeRuleByIdContract

export const deleteChallengeRuleById_Interceptor =
	http[method]<GetChallengeRuleById_RouteParams>(fakeBackend + route(), async ({
																				 params: { challenge_rule_id }
																			 }) => {
		const indexToDelete = database.challengeRules.findIndex(item => item.id === challenge_rule_id)

		if (indexToDelete !== -1) {
			database.challengeRules.splice(indexToDelete, 1)

			return HttpResponse.json(
				undefined,
				{
					status: responseExample?.status
				}
			)
		} else return notFound_ErrorResponse('Challenge rule')
	})
