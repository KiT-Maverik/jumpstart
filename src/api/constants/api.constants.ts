import { errorMessage } from 'configuration/locale'
import { Paginator, ApiError } from 'api/schemas'

export const fakeBackend = 'http://mock.internal'

export enum REQUEST_METHOD {
	GET = 'get',
	PATCH = 'patch',
	POST = 'post',
	DELETE = 'delete',
}

export enum SORTING {
	ASC = 'asc',
	DESC = 'desc',
}

export enum CONTRACT_GROUP {
	USER = 'User',
}

export const defaultPaginator: Paginator = {
	offset: 0,
	limit: 10,
}

type ApiErrorStore = {
	[key: string]: ApiError | ((v: string) => ApiError)
}

export const apiError = {
	alreadyExist: (entity: string): ApiError => ({
		status: 400,
		payload: {
			message: errorMessage.api.alreadyExist(entity)
		}
	}),
	notFound: (entity: string): ApiError => ({
		status: 404,
		payload: {
			message: errorMessage.api.notFound(entity)
		}
	}),
	badRequest: {
		status: 400,
		payload: {
			message: errorMessage.generic
		}
	},
	paginatorMissing: {
		status: 400,
		payload: {
			message: errorMessage.api.paginatorMissing,
		}
	},
	unauthorized: {
		status: 401,
		payload: {
			message: errorMessage.api.notAuthorized
		}
	}
} satisfies ApiErrorStore
