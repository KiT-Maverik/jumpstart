import { http, HttpResponse } from 'msw'

import { fakeBackend, GetUserById_RouteParams } from 'api/constants'
import { deleteUserByIdContract } from 'api/contracts'
import { notFound_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = deleteUserByIdContract

export const deleteUserById_Interceptor =
	http[method]<GetUserById_RouteParams>(fakeBackend + route(), async ({
																					 params: { user_id }
																				 }) => {
		const indexToDelete = database.groups.findIndex(item => item.id === user_id)

		if (indexToDelete >= 0) {
			database.users.splice(indexToDelete, 1)

			return HttpResponse.json(
				undefined,
				{
					status: responseExample?.status
				}
			)
		} else return notFound_ErrorResponse('User')
	})
