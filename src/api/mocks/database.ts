import { Addon, ChallengeRule, ChallengeType, Company, Filter, Group, Transaction, User } from 'api/schemas'
import {
	createUserMock,
	createChallengeTypeMock,
	createAddonMock,
	createCompanyMock, createFilterMock, createChallengeRuleMock, createGroupMock, createTransactionMock
} from 'api/mocks'

const user: {[key in 'withFilter' | 'withGroup' | 'withTransaction']: User} = {
	withFilter: createUserMock({username: 'User with filter'}),
	withGroup: createUserMock({username: 'User with group'}),
	withTransaction: createUserMock({username: 'User with transaction'}),
}

const users: User[] = [
	user.withFilter,
	user.withGroup,
	user.withTransaction,
	...[1,2,3,4,5].map((item) => createUserMock({username: `User ${item}`})),
]

const challenge: {[key in 'withGroup']: ChallengeType} = {
	withGroup: createChallengeTypeMock({name: 'Challenge with group'}),
}

const challenges: Addon[] = [
	challenge.withGroup,
	...[1,2,3,4,5].map((item) => createAddonMock({name: `Challenge ${item}`})),
]

const challengeType: {[key in 'withGroup']: ChallengeType} = {
	withGroup: createChallengeTypeMock({name: 'Challenge type with group'}),
}

const challengeTypes: ChallengeType[] = [
	challengeType.withGroup,
	...[1,2,3,4,5].map((item) => createChallengeTypeMock({name: `Challenge type ${item}`})),
]

const company: {[key in 'withGroup' | 'withChallengeRule']: Company} = {
	withGroup: createCompanyMock({name: 'Company with group'}),
	withChallengeRule: createCompanyMock({name: 'Company with Challenge Rule'}),
}

const companies: Company[] = [
	company.withGroup,
	company.withChallengeRule,
	...[1,2,3,4,5].map((item) => createCompanyMock({name: `Company ${item}`})),
]

const filter: {[key in 'withUser']: Filter} = {
	withUser: createFilterMock({name: 'Filter with group'}),
}

const filters: Filter[] = [
	filter.withUser,
	...[1,2,3,4,5].map((item) => createFilterMock({name: `Filter ${item}`})),
]

const challengeRule: {[key in 'withCompany']: ChallengeRule} = {
	withCompany: createChallengeRuleMock({description: 'Challenge Rule with company'}),
}

const challengeRules: ChallengeRule[] = [
	challengeRule.withCompany,
	...[1,2,3,4,5].map((item) => createChallengeRuleMock({description: `Challenge Rule ${item}`})),
]

const group: {[key in 'withUser' | 'withCompany' | 'withChallenge' | 'withChallengeType']: Group} = {
	withUser: createGroupMock({name: 'Group with group'}),
	withCompany: createGroupMock({name: 'Group with group'}),
	withChallenge: createGroupMock({name: 'Group with group'}),
	withChallengeType: createGroupMock({name: 'Group with group'}),
}

const groups: Group[] = [
	group.withUser,
	group.withCompany,
	group.withChallenge,
	group.withChallengeType,
	...[1,2,3,4,5].map((item) => createGroupMock({name: `Group ${item}`})),
]

const transaction: {[key in 'withUser' | 'withGroup']: Transaction} = {
	withUser: createTransactionMock({user: users[0].id}),
	withGroup: createTransactionMock({group: groups[0].id}),
}

const transactions: Transaction[] = [
	transaction.withUser,
	transaction.withGroup,
	...[1,2,3,4,5].map(() => createTransactionMock()),
]

interface Database {
	challenges: Addon[]
	challengeRules: ChallengeRule[]
	challengeTypes: ChallengeType[]
	companies: Company[]
	filters: Filter[]
	groups: Group[]
	transactions: Transaction[]
	users: User[]
}

export const database: Database = {
	challenges,
	challengeRules,
	challengeTypes,
	companies,
	filters,
	groups,
	transactions,
	users,
}
