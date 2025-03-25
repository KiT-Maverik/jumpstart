import { http, HttpResponse } from 'msw'

import { fakeBackend } from 'api/constants'
import {
	CreateGroup_RequestPayload,
	createGroupContract,
	GetGroupById_ResponsePayload
} from 'api/contracts'
import { createGroupMock } from 'api/mocks'
import { alreadyExist_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = createGroupContract

export const createGroup_Interceptor =
	http[method]<never, CreateGroup_RequestPayload>(fakeBackend + route, async ({ request }) => {
		const data = await request.json()

		const existingEntityIndex = database.groups.findIndex(item => item.name === data.name)

		if (existingEntityIndex !== -1) return alreadyExist_ErrorResponse('Group')
		else {
			const newGroup = createGroupMock()

			database.groups.push(newGroup)

			return HttpResponse.json<GetGroupById_ResponsePayload>(
				newGroup,
				{ status: responseExample?.status },
			)
		}
	})
