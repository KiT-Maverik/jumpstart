import { user } from 'api/schemas'
import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { createUserMock } from 'api/mocks'
import { environmentVariable } from 'configuration/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'

const endpoint = {
	method: REQUEST_METHOD.GET,
	route: route.user.getById
} satisfies Contract_Endpoint

const schema = {
	response: {
		status: 200,
		payload: user
	}
} satisfies Contract_DataSchema

export type GetUserById_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type GetUserById_ResponsePayload = GetUserById_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const responseExample: GetUserById_Response = {
		status: 200,
		payload: createUserMock()
	}

	metadata = {
		description: 'Get User by Id',
		group: CONTRACT_GROUP.USER,
		responseExample,
	} satisfies Contract_Meta
}

export const getUserByIdContract = {
	name: 'Get user by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

