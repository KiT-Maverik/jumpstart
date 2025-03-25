import { http, HttpResponse } from 'msw'

import { fakeBackend, GetUserById_RouteParams } from 'api/constants'
import { updateUserByIdContract, UpdateUserById_RequestPayload, UpdateUserById_ResponsePayload } from 'api/contracts'
import { notFound_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = updateUserByIdContract

export const updateUserById_Interceptor =
	http[method]<GetUserById_RouteParams, UpdateUserById_RequestPayload>(fakeBackend + route(), async ({
																					 params: { user_id },
																					 request
																				 }) => {
		const data = await request.json()

		const indexToUpdate = database.companies.findIndex(item => item.id === user_id)

		if (indexToUpdate >= 0) {
			database.users[indexToUpdate] = {
				...database.users[indexToUpdate],
				...data
			}

			return HttpResponse.json<UpdateUserById_ResponsePayload>(
				database.users[indexToUpdate],
				{
					status: responseExample?.status
				}
			)
		} else return notFound_ErrorResponse('User')
	})
