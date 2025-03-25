import { ChallengeType } from 'api/schemas'

export const createChallengeTypeMock: (challengeType?: Partial<Omit<ChallengeType, 'id'>>) => ChallengeType = (challengeType) => ({
	id: crypto.randomUUID(),
	name: challengeType?.name ?? "Your new challenge type",
	companyId: crypto.randomUUID(),
	description: challengeType?.description ?? "Your new challenge type description",
})
