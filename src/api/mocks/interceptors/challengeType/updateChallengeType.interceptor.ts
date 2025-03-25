import { http, HttpResponse } from 'msw'

import { fakeBackend, GetChallengeTypeById_RouteParams } from 'api/constants'
import {
	UpdateChallengeTypeById_RequestPayload,
	UpdateChallengeTypeById_ResponsePayload,
	updateChallengeTypeByIdContract
} from 'api/contracts'
import { notFound_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = updateChallengeTypeByIdContract

export const updateChallengeType_Interceptor =
	http[method]<GetChallengeTypeById_RouteParams, UpdateChallengeTypeById_RequestPayload>(fakeBackend + route(), async ({
																													 request,
																													 params: { challenge_type_id }
																												 }) => {
		const data = await request.json()

		const indexToUpdate = database.challengeTypes.findIndex(item => item.id === challenge_type_id)

		if (indexToUpdate !== -1) {
			database.challengeTypes[indexToUpdate] = {
				...database.challengeTypes[indexToUpdate],
				...data
			}
			return HttpResponse.json<UpdateChallengeTypeById_ResponsePayload>(database.challengeTypes[indexToUpdate], {
				status: responseExample?.status
			})
		} else return notFound_ErrorResponse('Challenge type')
	})
