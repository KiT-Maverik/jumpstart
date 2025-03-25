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
	route: route.challengeType.getById
} satisfies Contract_Endpoint

const schema = {
	request: {
		payload: challengeType.pick({ name: true, description: true })
	},
	response: {
		status: 200,
		payload: challengeType
	}
} satisfies Contract_DataSchema

export type UpdateChallengeTypeById_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type UpdateChallengeTypeById_RequestPayload = UpdateChallengeTypeById_Request['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const challengeType = createChallengeTypeMock({name: 'Updated name'})

	const requestExample: UpdateChallengeTypeById_Request = {
		payload: {
			name: challengeType.name
		}
	}

	const responseExample: UpdateChallengeTypeById_Response = {
		status: 200,
		payload: challengeType,
	}

	metadata = {
		description: 'Update challenge type by id',
		group: CONTRACT_GROUP.CHALLENGE_TYPE,
		requestExample,
		responseExample,
	} satisfies Contract_Meta
}

export type UpdateChallengeTypeById_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type UpdateChallengeTypeById_ResponsePayload = UpdateChallengeTypeById_Response['payload']

export const updateChallengeTypeByIdContract = {
	name: 'Update challenge type by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
