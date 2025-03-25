import { challengeType } from 'api/schemas'
import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { environmentVariable } from 'configuration/constants'
import { createChallengeTypeMock } from 'api/mocks'

const endpoint = {
	method: REQUEST_METHOD.PATCH,
	route: route.challengeType.root
} satisfies Contract_Endpoint

const schema = {
	request: {
		payload: challengeType.pick({ name: true, description: true })
	},
	response: {
		status: 201,
		payload: challengeType
	}
} satisfies Contract_DataSchema

export type CreateChallengeType_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type CreateChallengeType_RequestPayload = CreateChallengeType_Request['payload']

export type CreateChallengeType_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type CreateChallengeType_ResponsePayload = CreateChallengeType_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {

	const challengeType = createChallengeTypeMock()

	const requestExample: CreateChallengeType_Request = {
		payload: challengeType,
	}

	const responseExample: CreateChallengeType_Response = {
		status: 201,
		payload: challengeType,
	}

	metadata = {
		description: 'Create Challenge type',
		group: CONTRACT_GROUP.CHALLENGE_TYPE,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const createChallengeTypeContract = {
	name: 'Create challenge type',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
