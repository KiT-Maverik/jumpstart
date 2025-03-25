import { http, HttpResponse } from 'msw'

import { fakeBackend, GetFilterById_RouteParams } from 'api/constants'
import { deleteFilterByIdContract } from 'api/contracts'
import { notFound_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = deleteFilterByIdContract

export const deleteFilterById_Interceptor =
	http[method]<GetFilterById_RouteParams>(fakeBackend + route(), async ({
																					 params: { filter_id }
																				 }) => {
		const indexToDelete = database.filters.findIndex(item => item.id === filter_id)

		if (indexToDelete !== -1) {
			database.filters.splice(indexToDelete, 1)

			return HttpResponse.json(
				undefined,
				{
					status: responseExample?.status
				}
			)
		} else return notFound_ErrorResponse('Filter')
	})
