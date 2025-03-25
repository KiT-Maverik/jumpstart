import { http, HttpResponse } from 'msw'

import { fakeBackend, GetChallengeTypeById_RouteParams } from 'api/constants'
import { getChallengeTypeByIdContract, GetChallengeTypeById_ResponsePayload } from 'api/contracts'
import { notFound_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = getChallengeTypeByIdContract

export const getChallengeById_Interceptor =
	http[method]<GetChallengeTypeById_RouteParams>(fakeBackend + route(), async ({ params: { challenge_type_id } }) => {
		const indexToRetrieve = database.challenges.findIndex(item => item.id === challenge_type_id)

		if (indexToRetrieve !== -1) {
			return HttpResponse.json<GetChallengeTypeById_ResponsePayload>(
				database.challengeTypes[indexToRetrieve],
				{
					status: responseExample?.status
				}
			)
		} else return notFound_ErrorResponse('Challenge type')
	})
