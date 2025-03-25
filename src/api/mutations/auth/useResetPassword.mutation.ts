import { useMutation } from '@tanstack/react-query'

import {
	resetPasswordContract,
	ResetPassword_RequestPayload,
	ResetPassword_Response,
} from 'api/contracts'
import { api } from 'configuration'

export const useResetPasswordMutation = () => {
	const {name, endpoint: {method, route}} = resetPasswordContract

	const resetPassword = useMutation({
		mutationKey: [name],
		mutationFn: async (data: ResetPassword_RequestPayload) =>
			await api[method]<ResetPassword_Response>(route, {
				data,
			}),
	})

	return { resetPassword }
}
