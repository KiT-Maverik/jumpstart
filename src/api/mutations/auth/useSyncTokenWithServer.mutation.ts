import { useMutation } from '@tanstack/react-query'

import {
	syncTokenWithServerContract,
	SyncTokenWithServer_RequestPayload,
} from 'api/contracts'
import { api } from 'configuration'

export const useSyncTokenWithServerMutation = () => {
	const {name, endpoint: { method, route}} = syncTokenWithServerContract

	// const { onSuccess, onError } = options

	const syncTokenWithServer = useMutation({
		mutationKey: [name],
		mutationFn: async (data: SyncTokenWithServer_RequestPayload) =>
			await api[method](route, {
				...data,
			}, {baseURL: window.location.origin,}),
		onError: (e) => {
			console.log(e)
		},
		onSuccess: () => {
			// onSuccess && onSuccess()
		},
	})

	return { syncTokenWithServer }
}
