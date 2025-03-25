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
	method: REQUEST_METHOD.PATCH,
	route: route.user.getById
} satisfies Contract_Endpoint


const schema = {
	request: {
		payload: user.partial(),
	},
	response: {
		status: 200,
		payload: user
	}
} satisfies Contract_DataSchema

export type UpdateUserById_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type UpdateUserById_RequestPayload = UpdateUserById_Request['payload']

export type UpdateUserById_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type UpdateUserById_ResponsePayload = UpdateUserById_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const user = createUserMock()

	const requestExample: UpdateUserById_Request = {
		payload: {
			email: user.email,
		},
	}

	const responseExample: UpdateUserById_Response = {
		status: 200,
		payload: user,
	}

	metadata = {
		description: 'Update User by Id',
		group: CONTRACT_GROUP.USER,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const updateUserByIdContract = {
	name: 'Update user by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

