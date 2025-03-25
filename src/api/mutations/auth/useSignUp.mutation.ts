import { useMutation } from '@tanstack/react-query'

import {
	signUpContract,
	SignUp_RequestPayload,
} from 'api/contracts'
import { RequestExtender } from 'api/types/request-hook'
import { api } from 'configuration'

export const useSignUpMutation = (options: RequestExtender<undefined> = {}) => {
	const {name, endpoint: { method, route}} = signUpContract

	const signUp = useMutation({
		mutationKey: [name],
		mutationFn: async (data: SignUp_RequestPayload) =>
			await api[method](route, data),
		onSuccess: () => {
			if (options.onSuccess) options.onSuccess()
		},
	})

	return { signUp }
}
