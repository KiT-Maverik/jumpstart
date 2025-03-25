import { http, HttpResponse } from 'msw'

import { fakeBackend } from 'api/constants'
import { CreateChallengeType_RequestPayload, createChallengeTypeContract, GetChallengeTypeById_ResponsePayload } from 'api/contracts'
import { createChallengeTypeMock } from 'api/mocks'
import { alreadyExist_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = createChallengeTypeContract

export const createChallengeType_Interceptor =
	http[method]<never, CreateChallengeType_RequestPayload>(fakeBackend + route, async ({ request }) => {
		const data = await request.json()

		const existingEntityIndex = database.challengeTypes.findIndex(item => item.name === data.name)

		if (existingEntityIndex !== -1) return alreadyExist_ErrorResponse('Challenge')
		else {
			const newChallengeType = createChallengeTypeMock(data)

			database.challengeTypes.push(newChallengeType)

			return HttpResponse.json<GetChallengeTypeById_ResponsePayload>(
				newChallengeType,
				{ status: responseExample?.status },
			)
		}
	})
