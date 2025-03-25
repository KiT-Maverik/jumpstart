import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { createChallengeRuleMock } from 'api/mocks'
import { challengeRule } from 'api/schemas'
import { environmentVariable, fakeData } from 'configuration/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'

const endpoint = {
	method: REQUEST_METHOD.GET,
	route: route.challengeRule.getById
} satisfies Contract_Endpoint

const schema = {
	response: {
		status: 200,
		payload: challengeRule
	}
} satisfies Contract_DataSchema

export type GetChallengeRuleById_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type GetChallengeRuleById_ResponsePayload = GetChallengeRuleById_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const responseExample: GetChallengeRuleById_Response = {
		status: 200,
		payload: createChallengeRuleMock({ id: fakeData.uuid})
	}

	metadata = {
		description: 'Get challenge rule by Id',
		group: CONTRACT_GROUP.CHALLENGE_RULE,
		responseExample,
	} satisfies Contract_Meta
}

export const getChallengeRuleByIdContract = {
	name: 'Get challenge rule by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
