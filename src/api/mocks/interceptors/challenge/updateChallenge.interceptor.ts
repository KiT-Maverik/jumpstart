import { http, HttpResponse } from 'msw'

import { fakeBackend, GetAddonById_RouteParams } from 'api/constants'
import {
	UpdateAddonById_RequestPayload,
	UpdateAddonById_ResponsePayload,
	updateAddonByIdContract
} from 'api/contracts'
import { notFound_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = updateAddonByIdContract

export const updateChallenge_Interceptor =
	http[method]<GetAddonById_RouteParams, UpdateAddonById_RequestPayload>(fakeBackend + route(), async ({
																													 request,
																													 params: { addon_id }
																												 }) => {
		const data = await request.json()

		const indexToUpdate = database.challenges.findIndex(item => item.id === addon_id)

		if (indexToUpdate !== -1) {
			database.challenges[indexToUpdate] = {
				...database.challenges[indexToUpdate],
				...data
			}
			return HttpResponse.json<UpdateAddonById_ResponsePayload>(database.challenges[indexToUpdate], {
				status: responseExample?.status
			})
		} else return notFound_ErrorResponse('Challenge')
	})
