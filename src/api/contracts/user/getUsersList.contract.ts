import { entityList_ResponsePayload_Schema, paginator, user } from 'api/schemas'
import { CONTRACT_GROUP, paginatorExample, REQUEST_METHOD, route } from 'api/constants'
import { createUserMock } from 'api/mocks'
import { environmentVariable } from 'configuration/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Meta
} from 'api/types/contract'

const endpoint = {
	method: REQUEST_METHOD.GET,
	route: route.user.root
}

const schema = {
	request: {
		query: paginator
	},
	response: {
		status: 200,
		payload: entityList_ResponsePayload_Schema(user)
	}
} satisfies Contract_DataSchema

export type GetUsersList_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type GetUsersList_RequestQuery = GetUsersList_Request['query']

export type GetUsersList_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type GetUsersList_ResponsePayload = GetUsersList_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const requestExample: GetUsersList_Request = {
		query: paginatorExample
	}

	const responseExample: GetUsersList_Response = {
		status: 200,
		payload: {
			count: 1,
			results: [createUserMock()]
		},
	}

	metadata = {
		description: 'Get list of Users',
		group: CONTRACT_GROUP.USER,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const getUsersListContract = {
	name: 'Get users list',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

