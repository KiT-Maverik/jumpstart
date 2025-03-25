import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { challengeType } from 'api/schemas'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { environmentVariable } from 'configuration/constants'
import { createChallengeTypeMock } from 'api/mocks'

const endpoint = {
	method: REQUEST_METHOD.GET,
	route: route.challengeType.getById
} satisfies Contract_Endpoint

const schema = {
	response: {
		status: 200,
		payload: challengeType
	}
} satisfies Contract_DataSchema

export type GetChallengeTypeById_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type GetChallengeTypeById_ResponsePayload = GetChallengeTypeById_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const responseExample: GetChallengeTypeById_Response = {
		status: 200,
		payload: createChallengeTypeMock()
	}

	metadata = {
		description: 'Get challenge type by Id',
		group: CONTRACT_GROUP.CHALLENGE_TYPE,
		responseExample
	} satisfies Contract_Meta
}

export const getChallengeTypeByIdContract = {
	name: 'Get challenge type by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
