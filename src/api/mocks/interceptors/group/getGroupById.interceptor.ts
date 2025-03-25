import { http, HttpResponse } from 'msw'

import { fakeBackend, GetGroupById_RouteParams } from 'api/constants'
import { GetGroupById_ResponsePayload, getGroupByIdContract } from 'api/contracts'
import { notFound_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = getGroupByIdContract

export const getGroupById_Interceptor =
	http[method]<GetGroupById_RouteParams>(fakeBackend + route(), async ({ params: { group_id } }) => {
		const indexToRetrieve = database.companies.findIndex(item => item.id === group_id)

		if (indexToRetrieve !== -1) {
			return HttpResponse.json<GetGroupById_ResponsePayload>(
				database.groups[indexToRetrieve],
				{
					status: responseExample?.status
				}
			)
		} else return notFound_ErrorResponse('Group')
	})
