import { http, HttpResponse } from 'msw'

import { fakeBackend, GetGroupById_RouteParams } from 'api/constants'
import { deleteGroupByIdContract } from 'api/contracts'
import { notFound_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = deleteGroupByIdContract

export const deleteGroupById_Interceptor =
	http[method]<GetGroupById_RouteParams>(fakeBackend + route(), async ({
																					 params: { group_id }
																				 }) => {
		const indexToDelete = database.groups.findIndex(item => item.id === group_id)

		if (indexToDelete >= 0) {
			database.groups.splice(indexToDelete, 1)

			return HttpResponse.json(
				undefined,
				{
					status: responseExample?.status
				}
			)
		} else return notFound_ErrorResponse('Group')
	})
