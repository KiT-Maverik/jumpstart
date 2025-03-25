import { createChallengeTypeMock, createCompanyMock } from 'api/mocks'
import { Group } from 'api/schemas'

export const createGroupMock: (challenge?: Partial<Omit<Group, 'id'>>) => Group = (group) => ({
	id: crypto.randomUUID(),
	name: group?.name ?? "Your new group",
	user: group?.user ?? crypto.randomUUID(),
	company: group?.company ?? createCompanyMock(),
	challenge_type: group?.challenge_type ?? createChallengeTypeMock(),
	addons: group?.addons ?? [],
	balance: group?.balance ?? 12345,
	is_archived: group?.is_archived ?? false,
})

export const createGroupsListMock: (length: number) => Group[] =
	(length = 5) => Array.from({ length }, (_, index) => createGroupMock({ name: `Group ${index + 1}` }))
