import { http, HttpResponse } from 'msw'

import { fakeBackend } from 'api/constants'
import {
	CreateChallengeRule_RequestPayload,
	createChallengeRuleContract,
	GetChallengeRuleById_ResponsePayload
} from 'api/contracts'
import { createChallengeRuleMock } from 'api/mocks'

import { database } from 'api/mocks/database'
import { alreadyExist_ErrorResponse } from 'api/utils'

const { endpoint: { method, route }, responseExample } = createChallengeRuleContract

export const createChallengeRule_Interceptor =
	http[method]<never, CreateChallengeRule_RequestPayload>(fakeBackend + route, async ({ request }) => {
		const data = await request.json()

		const existingEntityIndex = database.challengeRules.findIndex(item => item.description === data.description)

		if (existingEntityIndex !== -1) return alreadyExist_ErrorResponse('Challenge rule')
		else {
			const newChallengeRule = createChallengeRuleMock(data)

			database.challengeRules.push(newChallengeRule)

			return HttpResponse.json<GetChallengeRuleById_ResponsePayload>(
				newChallengeRule,
				{ status: responseExample?.status },
			)
		}
	})
