import { Id } from 'api/schemas'

export type GetUserById_RouteParams = { user_id: Id }

export const route = {
	user: {
		root: '/api/users/',
		getById: (params?: GetUserById_RouteParams) =>
			`/api/users/${params ? params.user_id : ':userId'}/`,
		confirmEmail: '/api/users/confirm_email/'
	}
}
