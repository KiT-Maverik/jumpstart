import { ChallengeRule } from 'api/schemas'

export const createChallengeRuleMock: (challengeRule?: Partial<ChallengeRule>) => ChallengeRule = (challengeRule) => ({
	id: challengeRule?.id ?? crypto.randomUUID(),
	companyId: crypto.randomUUID(),
	description: challengeRule?.description ?? "Your new challenge rule description",
	created_at: new Date().toISOString(),
})
