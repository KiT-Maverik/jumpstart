import { HttpResponse } from 'msw'

import { ApiError } from 'api/schemas'

export const notFound_ErrorResponse = (entityName: string) => {
	const { payload, status }: ApiError = {
		status: 400,
		payload: {
			message: `${entityName} not found`
		}
	}

	return HttpResponse.json(payload, { status })
}

export const alreadyExist_ErrorResponse = (entityName: string, uniqueProp: string = 'name') => {
	const { payload, status }: ApiError = {
		status: 400,
		payload: {
			message: `${entityName} with that ${uniqueProp} already exist`
		}
	}

	return HttpResponse.json(payload, { status })
}
