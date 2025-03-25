import { Id } from 'api/schemas'

export type GetApiKeyById_RouteParams = { key_id: Id }
export type GetAddonById_RouteParams = { addon_id: Id }
export type GetChallengeRuleById_RouteParams = { challenge_rule_id: Id }
export type GetChallengeTypeById_RouteParams = { challenge_type_id: Id }
export type GetCompanyById_RouteParams = { company_id: Id }
export type GetFilterById_RouteParams = { filter_id: Id }
export type GetGroupById_RouteParams = { group_id: Id }
export type GetUserById_RouteParams = { user_id: Id }
export type GetTransactionById_RouteParams = { transaction_id: Id }
export type AddTransactionToGroup_RouteParams = { transaction_id: Id, group_id: Id }
export type RemoveTransactionFromGroup_RouteParams = { transaction_id: Id, group_id: Id }

export const route = {
	apiKey: {
		root: '/api/api_keys/',
		getById: (params?: GetApiKeyById_RouteParams) =>
			`/api/api_keys/${params ? params.key_id : ':key_id'}/`
	},
	auth: {
		signUp: '/api/auth/sign_up/',
		password: {
			change: '/api/auth/password_change/',
			reset: '/api/auth/password_reset/',
		},
		token: {
			create: '/api/auth/token/create/',
			refresh: '/api/auth/token/refresh/',
			sync: '/api/auth/token/sync/',
			verify: '/api/auth/token/verify/'
		}
	},
	addon: {
		root: '/api/addons/',
		getById: (params?: GetAddonById_RouteParams) =>
			`/api/addons/${params ? params.addon_id : ':addonId'}/`
	},
	challengeRule: {
		root: '/api/challenge_rules/',
		getById: (params?: GetChallengeRuleById_RouteParams) =>
			`/api/challenge_rules/${params ? params.challenge_rule_id : ':challengeRuleId'}/`
	},
	challengeType: {
		root: '/api/challenge_types/',
		getById: (params?: GetChallengeTypeById_RouteParams) =>
			`/api/challenge_types/${params ? params.challenge_type_id : ':challengeTypeId'}/`
	},
	company: {
		root: '/api/companies/',
		getById: (params?: GetCompanyById_RouteParams) =>
			`/api/companies/${params ? params.company_id : ':companyId'}/`
	},
	filter: {
		root: '/api/filters/',
		getById: (params?: GetFilterById_RouteParams) =>
			`/api/filters/${params ? params.filter_id : ':filterId'}/`,
	},
	group: {
		root: '/api/groups/',
		getById: (params?: GetGroupById_RouteParams) =>
			`/api/groups/${params ? params.group_id : ':groupId'}/`
	},
	internal: {
		syncToken: '/next_api/sync_token/',
	},
	statistics: {
		root: '/api/statistics/',
		export: '/api/statistics/export/'
	},
	transaction: {
		root: '/api/transactions/',
		getById: (params?: GetTransactionById_RouteParams) =>
			`/api/transactions/${params ? params.transaction_id : ':transaction_id'}/`,
		addToGroup: (params?: AddTransactionToGroup_RouteParams) =>
			`/api/transactions/${params ? params.transaction_id : ':transaction_id'}/add_to_group/${params ? params.group_id : ':group_id'}/`,
		removeFromGroup: (params?: RemoveTransactionFromGroup_RouteParams) =>
			`/api/transactions/${params ? params.transaction_id : ':transaction_id'}/remove_from_group/${params ? params.group_id : ':group_id'}/`,
	},
	user: {
		root: '/api/users/',
		getById: (params?: GetUserById_RouteParams) =>
			`/api/users/${params ? params.user_id : ':userId'}/`,
		confirmEmail: '/api/users/confirm_email/'
	}
}
