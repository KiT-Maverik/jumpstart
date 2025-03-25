import { http, HttpResponse } from 'msw'

import { fakeBackend, GetCompanyById_RouteParams } from 'api/constants'
import { deleteCompanyByIdContract } from 'api/contracts'
import { notFound_ErrorResponse } from 'api/utils'

import { database } from 'api/mocks/database'

const { endpoint: { method, route }, responseExample } = deleteCompanyByIdContract

export const deleteCompanyById_Interceptor =
	http[method]<GetCompanyById_RouteParams>(fakeBackend + route(), async ({
																					 params: { company_id }
																				 }) => {
		const indexToDelete = database.companies.findIndex(item => item.id === company_id)

		if (indexToDelete >= 0) {
			database.companies.splice(indexToDelete, 1)

			return HttpResponse.json(
				undefined,
				{
					status: responseExample?.status
				}
			)
		} else return notFound_ErrorResponse('Company')
	})
