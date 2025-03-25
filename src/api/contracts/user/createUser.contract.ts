import { user } from 'api/schemas'
import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { createUserMock } from 'api/mocks'
import { environmentVariable } from 'configuration/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Meta
} from 'api/types/contract'

const endpoint = {
	method: REQUEST_METHOD.POST,
	route: route.user.root
}

const schema = {
	request: {
		payload: user.pick({ email: true, password: true })
	},
	response: {
		status: 201,
		payload: user
	}
} satisfies Contract_DataSchema

export type CreateUser_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type CreateUser_RequestPayload = CreateUser_Request['payload']

export type CreateUser_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type CreateUser_ResponsePayload = CreateUser_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const user = createUserMock()

	const requestExample: CreateUser_Request = {
		payload: {
			email: user.email,
			password: user.password
		}
	}

	const responseExample: CreateUser_Response = {
		status: 201,
		payload: user
	}

	metadata = {
		description: 'Create User',
		group: CONTRACT_GROUP.USER,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const createUserContract = {
	name: 'Create user',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

