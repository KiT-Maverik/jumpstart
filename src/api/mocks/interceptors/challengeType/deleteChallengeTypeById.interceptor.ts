import { http, HttpResponse } from 'msw'

import { fakeBackend, GetChallengeTypeById_RouteParams } from 'api/constants'
import { deleteChallengeTypeByIdContract } from 'api/contracts'
import { notFound_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = deleteChallengeTypeByIdContract

export const deleteChallengeTypeById_Interceptor =
	http[method]<GetChallengeTypeById_RouteParams>(fakeBackend + route(), async ({
																				 params: { challenge_type_id }
																			 }) => {
		const indexToDelete = database.challenges.findIndex(item => item.id === challenge_type_id)

		if (indexToDelete !== -1) {
			database.challengeTypes.splice(indexToDelete, 1)

			return HttpResponse.json(
				undefined,
				{
					status: responseExample?.status
				}
			)
		} else return notFound_ErrorResponse('Challenge type')
	})
