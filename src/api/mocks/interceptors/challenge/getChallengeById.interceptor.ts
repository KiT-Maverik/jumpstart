import { http, HttpResponse } from 'msw'

import { fakeBackend, GetAddonById_RouteParams } from 'api/constants'
import { getAddonByIdContract, GetAddonById_ResponsePayload } from 'api/contracts'
import { notFound_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = getAddonByIdContract

export const getChallengeById_Interceptor =
	http[method]<GetAddonById_RouteParams>(fakeBackend + route(), async ({ params: { addon_id } }) => {
		const indexToRetrieve = database.challenges.findIndex(item => item.id === addon_id)

		if (indexToRetrieve !== -1) {
			return HttpResponse.json<GetAddonById_ResponsePayload>(
				database.challenges[indexToRetrieve],
				{
					status: responseExample?.status
				}
			)
		} else return notFound_ErrorResponse('Challenge')
	})
