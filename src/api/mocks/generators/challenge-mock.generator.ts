import { Addon } from 'api/schemas'

export const createAddonMock: (addon?: Partial<Addon>) => Addon = (addon) => ({
	id: addon?.id ?? crypto.randomUUID(),
	name: addon?.name ?? "Your new addon",
	description: addon?.description ?? 'With a detailed description'
})
