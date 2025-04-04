import { z } from 'zod'

import { challengeRule, paginator } from 'api/schemas'
import { CONTRACT_GROUP, defaultPaginator, REQUEST_METHOD, route } from 'api/constants'
import { createChallengeRuleMock } from 'api/mocks'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { environmentVariable, fakeData } from 'configuration/constants'

const endpoint = {
	method: REQUEST_METHOD.GET,
	route: route.challengeRule.root
} satisfies Contract_Endpoint

const schema = {
	request: {
		query: paginator.merge(z.object({ company_id: z.string().uuid().optional() }))
	},
	response: {
		status: 200,
		payload: z.object({
			count: z.number(),
			results: z.array(challengeRule)
		})

	}
} satisfies Contract_DataSchema

export type GetChallengeRulesList_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type GetChallengeRulesList_RequestQuery = GetChallengeRulesList_Request['query']

export type GetChallengeRulesList_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type GetChallengeRulesList_ResponsePayload = GetChallengeRulesList_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const challengeRule = createChallengeRuleMock({ id: fakeData.uuid })

	const requestExample: GetChallengeRulesList_Request = {
		query: {
			company_id: fakeData.uuid,
			...defaultPaginator,
		}
	}

	const responseExample: GetChallengeRulesList_Response = {
		status: 200,
		payload: {
			count: 1,
			results: [challengeRule]
		}
	}

	metadata = {
		description: 'Get list of challenge rules',
		group: CONTRACT_GROUP.CHALLENGE_RULE,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const getChallengeRulesListContract = {
	name: 'Get challenge rules List',
	endpoint,
	schema,
	...metadata
} satisfies Contract
