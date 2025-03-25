'use client'

import { QueryClient } from '@tanstack/react-query'

type Mode = 'Prod' | 'Storybook'

export const createTanstackClientForServer: (mode: Mode) => QueryClient =
	(mode) => new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
				retry: mode === 'Prod' ? 2 : 0
			}
		}
	})
