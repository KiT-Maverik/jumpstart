import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

import {
	verifyTokenContract,
	VerifyToken_RequestPayload,
	VerifyToken_ResponsePayload,
} from 'api/contracts'
import { RequestExtender } from 'api/types/request-hook'
import { api } from 'configuration'

export const useVerifyTokenMutation = (options: RequestExtender<VerifyToken_ResponsePayload>) => {
	const {name, endpoint: { method, route}} = verifyTokenContract

	const { onSuccess, onError } = options

	const verifyToken = useMutation<AxiosResponse<VerifyToken_ResponsePayload>, unknown, VerifyToken_RequestPayload>({
		mutationKey: [name],
		mutationFn: async (data) =>
			await api[method](route, data),
		onError: () => {
			if (onError) onError()
		},
		onSuccess: (data) => {
			if (onSuccess) onSuccess(data)
		},
	})

	return { verifyToken }
}
