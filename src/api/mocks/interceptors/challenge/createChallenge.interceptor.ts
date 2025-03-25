import { http, HttpResponse } from 'msw'

import { fakeBackend } from 'api/constants'
import { CreateAddon_RequestPayload, createAddonContract, GetAddonById_ResponsePayload } from 'api/contracts'
import { createAddonMock } from 'api/mocks'
import { alreadyExist_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = createAddonContract

export const createChallenge_Interceptor =
	http[method]<never, CreateAddon_RequestPayload>(fakeBackend + route, async ({ request }) => {
		const data = await request.json()

		const existingEntityIndex = database.challenges.findIndex(item => item.name === data.name)

		if (existingEntityIndex !== -1) return alreadyExist_ErrorResponse('Challenge')
		else {
			const newChallenge = createAddonMock(data)

			database.challenges.push(newChallenge)

			return HttpResponse.json<GetAddonById_ResponsePayload>(
				newChallenge,
				{ status: responseExample?.status },
			)
		}
	})
