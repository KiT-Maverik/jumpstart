import { Id, user } from 'api/schemas'
import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { createUserMock } from 'api/mocks'
import { api } from 'configuration/api.client'
import { environmentVariable } from 'configuration/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'

import {getUserByIdContract} from './getUserById.contract'

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

export type GetCurrentUser_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type GetCurrentUser_ResponsePayload = GetCurrentUser_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const responseExample: GetCurrentUser_Response = {
		status: 200,
		payload: createUserMock()
	}

	metadata = {
		description: `Get current user by Id. This hook calls ${getUserByIdContract} endpoint with predefined user_id.`,
		group: CONTRACT_GROUP.USER,
		responseExample,
	} satisfies Contract_Meta
}

export const getCurrentUserContract = {
	name: 'Get current user',
	execute: async (user_id: Id) =>
		await api[endpoint.method]<GetCurrentUser_ResponsePayload>(endpoint.route({ user_id })),
	endpoint,
	schema,
	...metadata,
} satisfies Contract

