import { http, HttpResponse } from 'msw'

import { fakeBackend, GetUserById_RouteParams } from 'api/constants'
import { GetUserById_ResponsePayload, getUserByIdContract } from 'api/contracts'
import { notFound_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = getUserByIdContract

export const getUserById_Interceptor =
	http[method]<GetUserById_RouteParams>(fakeBackend + route(), async ({ params: { user_id } }) => {
		const indexToRetrieve = database.companies.findIndex(item => item.id === user_id)

		if (indexToRetrieve !== -1) {
			return HttpResponse.json<GetUserById_ResponsePayload>(
				database.users[indexToRetrieve],
				{
					status: responseExample?.status
				}
			)
		} else return notFound_ErrorResponse('User')
	})
