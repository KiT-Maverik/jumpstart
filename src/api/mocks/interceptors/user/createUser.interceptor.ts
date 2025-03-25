import { http, HttpResponse } from 'msw'

import { fakeBackend } from 'api/constants'
import {
	CreateUser_RequestPayload,
	createUserContract,
	GetUserById_ResponsePayload
} from 'api/contracts'
import { createUserMock } from 'api/mocks'
import { alreadyExist_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = createUserContract

export const createUser_Interceptor =
	http[method]<never, CreateUser_RequestPayload>(fakeBackend + route, async ({ request }) => {
		const data = await request.json()

		const existingEntityIndex = database.users.findIndex(item => item.email === data.email)

		if (existingEntityIndex !== -1) return alreadyExist_ErrorResponse('User', 'email')
		else {
			const newUser = createUserMock(data)

			database.users.push(newUser)

			return HttpResponse.json<GetUserById_ResponsePayload>(
				newUser,
				{ status: responseExample?.status },
			)
		}
	})
