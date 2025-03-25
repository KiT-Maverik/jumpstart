import { http, HttpResponse } from 'msw'

import { fakeBackend } from 'api/constants'
import {
	CreateFilter_RequestPayload,
	createFilterContract,
	GetFilterById_ResponsePayload
} from 'api/contracts'
import { createFilterMock } from 'api/mocks'
import { alreadyExist_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = createFilterContract

export const createFilter_Interceptor =
	http[method]<never, CreateFilter_RequestPayload>(fakeBackend + route, async ({ request }) => {
		const data = await request.json()

		const existingEntityIndex = database.filters.findIndex(item => item.name === data.name)

		if (existingEntityIndex !== -1) return alreadyExist_ErrorResponse('Filter')
		else {
			const newFilter = createFilterMock(data)

			database.filters.push(newFilter)

			return HttpResponse.json<GetFilterById_ResponsePayload>(
				newFilter,
				{ status: responseExample?.status },
			)
		}
	})
