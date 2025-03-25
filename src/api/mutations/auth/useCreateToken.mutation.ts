import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import {
	createTokenContract,
	CreateToken_RequestPayload,
	CreateToken_ResponsePayload,
} from 'api/contracts'
import { RequestExtender } from 'api/types/request-hook'
import { api } from 'configuration'
import { useToast } from 'configuration/store'
import { useLogin } from 'hooks'

export type CreateTokenMutation_Extender = RequestExtender<CreateToken_ResponsePayload>

export const useCreateTokenMutation = (options: CreateTokenMutation_Extender = {}) => {
	const {name, endpoint: { method, route}} = createTokenContract
	const { showToast } = useToast()
	const { login } = useLogin()

	const { onError } = options

	const createToken = useMutation<AxiosResponse<CreateToken_ResponsePayload>, unknown, CreateToken_RequestPayload>({
		mutationKey: [name],
		mutationFn: async (data) =>
			await api[method](route, data),
		onError: (e) => {
			showToast({message: 'Login failed', type: 'error'})
			if (onError) onError(e)
		},
		onSuccess: (data) => {
			login({
				user: data.data.user,
				access: data.data.access,
				refresh: data.data.refresh,
			})
		},
	})

	return { createToken }
}
