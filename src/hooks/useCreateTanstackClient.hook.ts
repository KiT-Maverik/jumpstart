import { QueryCache, QueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { environment } from 'utils'

const useConditionalLogout = async () => {
	const { useLogout } = await import('./useLogout.hook')
	// Code works, but linter fails. Find solution later
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { logout } = useLogout()
	logout()
}

export const useCreateTanstackClient = () => {
	const createTanstackClient = useCallback(() => new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
				retry: (failureCount, error) => {
					if (error.message.includes('403')) return false
					else if (environment.api.mode === 'storybook') return false
					else return failureCount < 2
				}
			},
			mutations: {
				onError: async (error) => {
					if (error.message.includes('403')) {
						// Code works, but linter fails. Find solution later
						// eslint-disable-next-line react-hooks/rules-of-hooks
						useConditionalLogout()

						return
					}
				}
			}
		},
		queryCache: new QueryCache({
			onError: async (error) => {
				if (error.message.includes('403')) {
					// Code works, but linter fails. Find solution later
					// eslint-disable-next-line react-hooks/rules-of-hooks
					useConditionalLogout()

					return
				}
			}
		})
	}), [])

	return { createTanstackClient }
}
