import { http, HttpResponse } from 'msw'

import { fakeBackend, GetAddonById_RouteParams } from 'api/constants'
import { deleteAddonByIdContract } from 'api/contracts'
import { notFound_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = deleteAddonByIdContract

export const deleteChallengeById_Interceptor =
	http[method]<GetAddonById_RouteParams>(fakeBackend + route(), async ({
																				 params: { addon_id }
																			 }) => {
		const indexToDelete = database.challenges.findIndex(item => item.id === addon_id)

		if (indexToDelete >= 0) {
			database.challenges.splice(indexToDelete, 1)

			return HttpResponse.json(
				undefined,
				{
					status: responseExample?.status
				}
			)
		} else return notFound_ErrorResponse('Challenge')
	})
