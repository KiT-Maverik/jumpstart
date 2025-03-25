export const environment = {
	api: {
		baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
		mode: process.env.NEXT_PUBLIC_API_MODE as 'live' | 'storybook' | undefined
	},
	mocking: {
		enabled: Boolean(process.env.NEXT_PUBLIC_MOCKED),
		serverUrl: process.env.NEXT_PUBLIC_MOCK_SERVER_URL
	}
} as const
