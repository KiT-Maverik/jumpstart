import { QueryClientProvider } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useCreateTanstackClient } from 'hooks'

interface TanstackProviderProps {
	children: React.ReactNode
}

export const TanstackProvider = ({ children }: TanstackProviderProps) => {
	const { createTanstackClient } = useCreateTanstackClient()

	const browserClient = useMemo(() => createTanstackClient(), [createTanstackClient])

	return (
		<QueryClientProvider client={browserClient}>
			{children}
		</QueryClientProvider>
	)
}
