import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { environmentVariable } from 'configuration/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'

const endpoint = {
	method: REQUEST_METHOD.DELETE,
	route: route.challengeRule.getById
} satisfies Contract_Endpoint


const schema = {
	response: {
		status: 204
	}
} satisfies Contract_DataSchema

export type DeleteChallengeRuleById_Response = Contract_ApiSchemaConstructor<typeof schema.response>

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const responseExample: DeleteChallengeRuleById_Response = {
		status: 204
	}

	metadata = {
		description: 'Delete challenge rule by Id',
		group: CONTRACT_GROUP.CHALLENGE_RULE,
		responseExample,
	} satisfies Contract_Meta
}

export const deleteChallengeRuleByIdContract = {
	name: 'Delete challenge rule by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
