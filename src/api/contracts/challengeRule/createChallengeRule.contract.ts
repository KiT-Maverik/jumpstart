import { challengeRule } from 'api/schemas'
import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { createChallengeRuleMock } from 'api/mocks'
import { environmentVariable, fakeData } from 'configuration/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'

const endpoint = {
	method: REQUEST_METHOD.PATCH,
	route: route.challengeRule.root
} satisfies Contract_Endpoint

const schema = {
	request: {
		payload: challengeRule.pick({ description: true })
	},
	response: {
		status: 201,
		payload: challengeRule
	}
} satisfies Contract_DataSchema

export type CreateChallengeRule_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type CreateChallengeRule_RequestPayload = CreateChallengeRule_Request['payload']

export type CreateChallengeRule_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type CreateChallengeRule_ResponsePayload = CreateChallengeRule_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const challengeRule = createChallengeRuleMock({ id: fakeData.uuid})

	const requestExample: CreateChallengeRule_Request = {
		payload: {
			description: challengeRule.description,
		},
	}

	const responseExample: CreateChallengeRule_Response = {
		status: 201,
		payload: challengeRule,
	}

	metadata = {
		description: 'Create Challenge rule',
		group: CONTRACT_GROUP.CHALLENGE_RULE,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const createChallengeRuleContract = {
	name: 'Create challenge rule',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
