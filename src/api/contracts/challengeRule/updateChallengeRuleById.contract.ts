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
	route: route.challengeRule.getById
} satisfies Contract_Endpoint

const schema = {
	request: {
		payload: challengeRule.pick({ description: true })
	},
	response: {
		status: 200,
		payload: challengeRule
	}
} satisfies Contract_DataSchema

export type UpdateChallengeRuleById_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type UpdateChallengeRuleById_RequestPayload = UpdateChallengeRuleById_Request['payload']

export type UpdateChallengeRuleById_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type UpdateChallengeRuleById_ResponsePayload = UpdateChallengeRuleById_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const challengeRule = createChallengeRuleMock({ id: fakeData.uuid, description: 'Updated description'})

	const requestExample: UpdateChallengeRuleById_Request = {
		payload: {
			description: challengeRule.description,
		}
	}

	const responseExample: UpdateChallengeRuleById_Response = {
		status: 200,
		payload: challengeRule
	}

	metadata = {
		description: 'Update challenge rule by id',
		group: CONTRACT_GROUP.CHALLENGE_RULE,
		requestExample,
		responseExample,
	} satisfies Contract_Meta
}

export const updateChallengeRuleByIdContract = {
	name: 'Update challenge rule by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
