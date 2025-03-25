import { Company } from 'api/schemas'

export const createCompanyMock: (company?: Partial<Omit<Company, 'id'>>) => Company = (company) => ({
	id: crypto.randomUUID(),
	name: company?.name ?? "Your new company",
	description: company?.description ?? "Your new company description",
	rules: [],
	created_at: new Date().toISOString(),
})
