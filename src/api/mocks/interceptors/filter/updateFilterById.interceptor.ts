import { http, HttpResponse } from 'msw'

import { fakeBackend, GetFilterById_RouteParams } from 'api/constants'
import { updateFilterByIdContract, UpdateFilterById_RequestPayload, UpdateFilterById_ResponsePayload } from 'api/contracts'
import { notFound_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = updateFilterByIdContract

export const updateFilterById_Interceptor =
	http[method]<GetFilterById_RouteParams, UpdateFilterById_RequestPayload>(fakeBackend + route(), async ({
																					 params: { filter_id },
																					 request
																				 }) => {
		const data = await request.json()

		const indexToUpdate = database.companies.findIndex(item => item.id === filter_id)

		if (indexToUpdate !== -1) {
			database.companies[indexToUpdate] = {
				...database.companies[indexToUpdate],
				...data
			}

			return HttpResponse.json<UpdateFilterById_ResponsePayload>(
				database.filters[indexToUpdate],
				{
					status: responseExample?.status
				}
			)
		} else return notFound_ErrorResponse('Filter')
	})
