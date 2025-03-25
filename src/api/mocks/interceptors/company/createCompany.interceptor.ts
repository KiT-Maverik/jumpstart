import { http, HttpResponse } from 'msw'

import { fakeBackend } from 'api/constants'
import {
	CreateCompany_RequestPayload,
	createCompanyContract,
	GetCompanyById_ResponsePayload
} from 'api/contracts'
import { createCompanyMock } from 'api/mocks'
import { alreadyExist_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = createCompanyContract

export const createCompany_Interceptor =
	http[method]<never, CreateCompany_RequestPayload>(fakeBackend + route, async ({ request }) => {
		const data = await request.json()

		const existingEntityIndex = database.companies.findIndex(item => item.name === data.name)

		if (existingEntityIndex !== -1) return alreadyExist_ErrorResponse('Company')
		else {
			const newCompany = createCompanyMock(data)

			database.companies.push(newCompany)

			return HttpResponse.json<GetCompanyById_ResponsePayload>(
				newCompany,
				{ status: responseExample?.status },
			)
		}
	})
