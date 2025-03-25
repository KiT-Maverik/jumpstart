import { useMutation } from '@tanstack/react-query'

import {
	removeTokenFromServerContract,
} from 'api/contracts'
import { api } from 'configuration'

export const useRemoveTokenFromServer = () => {
	const {name, endpoint: { method, route}} = removeTokenFromServerContract

	// const { onSuccess, onError } = options
	// todo ensure calls nextjs server (baseurl)

	const removeTokenFromServer = useMutation({
		mutationKey: [name],
		mutationFn: async () =>
			await api[method](route, {
				baseURL: window.location.origin
			}),
		onError: (e) => {
			console.log(e)
		},
		onSuccess: () => {
			console.log('sync ok')
			// onSuccess && onSuccess()
		},
	})

	return { removeTokenFromServer }
}
