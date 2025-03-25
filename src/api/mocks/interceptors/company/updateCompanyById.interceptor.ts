import { http, HttpResponse } from 'msw'

import { fakeBackend, GetCompanyById_RouteParams } from 'api/constants'
import { updateCompanyByIdContract, UpdateCompanyById_RequestPayload, UpdateCompanyById_ResponsePayload } from 'api/contracts'
import { notFound_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = updateCompanyByIdContract

export const updateCompanyById_Interceptor =
	http[method]<GetCompanyById_RouteParams, UpdateCompanyById_RequestPayload>(fakeBackend + route(), async ({
																					 params: { company_id },
																					 request
																				 }) => {
		const data = await request.json()

		const indexToUpdate = database.companies.findIndex(item => item.id === company_id)

		if (indexToUpdate !== -1) {
			database.companies[indexToUpdate] = {
				...database.companies[indexToUpdate],
				...data
			}

			return HttpResponse.json<UpdateCompanyById_ResponsePayload>(
				database.companies[indexToUpdate],
				{
					status: responseExample?.status
				}
			)
		} else return notFound_ErrorResponse('Company')
	})
