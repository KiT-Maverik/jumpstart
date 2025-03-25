import { http, HttpResponse } from 'msw'

import { fakeBackend, GetGroupById_RouteParams } from 'api/constants'
import { updateGroupByIdContract, UpdateGroupById_RequestPayload, UpdateGroupById_ResponsePayload } from 'api/contracts'
import { notFound_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = updateGroupByIdContract

export const updateGroupById_Interceptor =
	http[method]<GetGroupById_RouteParams, UpdateGroupById_RequestPayload>(fakeBackend + route(), async ({
																					 params: { group_id },
																					 request
																				 }) => {
		const data = await request.json()

		const indexToUpdate = database.companies.findIndex(item => item.id === group_id)

		if (indexToUpdate >= 0) {
			database.companies[indexToUpdate] = {
				...database.companies[indexToUpdate],
				...data
			}

			return HttpResponse.json<UpdateGroupById_ResponsePayload>(
				database.groups[indexToUpdate],
				{
					status: responseExample?.status
				}
			)
		} else return notFound_ErrorResponse('Group')
	})
