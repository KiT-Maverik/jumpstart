import { useMutation } from '@tanstack/react-query'

import {
	ChangePassword_RequestPayload,
	ChangePassword_Response,
	changePasswordContract
} from 'api/contracts'
import { RequestExtender } from 'api/types/request-hook'
import { api } from 'configuration'
import { useToast } from 'configuration/store'

export const useChangePasswordMutation = ({ onSuccess }: RequestExtender = {}) => {
	const { name, endpoint: { method, route } } = changePasswordContract

	const { showToast } = useToast()

	const changePassword = useMutation({
		mutationKey: [name],
		mutationFn: async (data: ChangePassword_RequestPayload) =>
			await api[method]<ChangePassword_Response>(route, data),
		onSuccess: () => {
			if (onSuccess) onSuccess()
			showToast({ message: 'Password changed', type: 'success' })
		},
	})

	return { changePassword }
}
