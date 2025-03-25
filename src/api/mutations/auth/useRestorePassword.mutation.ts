import { useMutation } from '@tanstack/react-query'

import {
	RestorePassword_RequestPayload,
	RestorePassword_Response,
	restorePasswordContract
} from 'api/contracts'
import { api } from 'configuration'

export const useRestorePasswordMutation = () => {
	const { name, endpoint: { method, route } } = restorePasswordContract

	const restorePassword = useMutation({
		mutationKey: [name],
		mutationFn: async (data: RestorePassword_RequestPayload) =>
			await api[method]<RestorePassword_Response>(route, data)
	})

	return { restorePassword }
}
