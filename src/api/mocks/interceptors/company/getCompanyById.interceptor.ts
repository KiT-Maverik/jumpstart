import { http, HttpResponse } from 'msw'

import { fakeBackend, GetCompanyById_RouteParams } from 'api/constants'
import { GetCompanyById_ResponsePayload, getCompanyByIdContract } from 'api/contracts'
import { notFound_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = getCompanyByIdContract

export const getCompanyById_Interceptor =
	http[method]<GetCompanyById_RouteParams>(fakeBackend + route(), async ({ params: { company_id } }) => {
		const indexToRetrieve = database.companies.findIndex(item => item.id === company_id)

		if (indexToRetrieve !== -1) {
			return HttpResponse.json<GetCompanyById_ResponsePayload>(
				database.companies[indexToRetrieve],
				{
					status: responseExample?.status
				}
			)
		} else return notFound_ErrorResponse('Company')
	})
