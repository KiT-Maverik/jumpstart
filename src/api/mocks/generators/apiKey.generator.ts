import { ApiKey } from 'api/schemas'

export const createApiKeyMock: (filter?: Partial<Omit<ApiKey, 'id'>>) => ApiKey = (apiKey) => ({
	id: crypto.randomUUID(),
	name: apiKey?.name ?? "Your new api key",
	is_active: apiKey?.is_active ?? true,
	created_at: apiKey?.created_at ?? new Date().toISOString(),
})
