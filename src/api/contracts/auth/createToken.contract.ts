import { z } from 'zod'

import { tokens, user } from 'api/schemas'
import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { createUserMock } from 'api/mocks'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { environmentVariable, fakeData } from 'configuration/constants'

const endpoint = {
	method: REQUEST_METHOD.POST,
	route: route.auth.token.create
} satisfies Contract_Endpoint

const schema = {
	request: {
		payload: user.pick({ email: true, password: true })
	},
	response: {
		status: 201,
		payload: z.object({
			user,
		}).merge(tokens),
	}
} satisfies Contract_DataSchema

export type CreateToken_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type CreateToken_RequestPayload = CreateToken_Request['payload']

export type CreateToken_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type CreateToken_ResponsePayload = CreateToken_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const requestExample: CreateToken_Request = {
		payload: {
			email: fakeData.email,
			password: fakeData.password,
		},
	}

	const responseExample: CreateToken_Response = {
		status: 201,
		payload: {
			user: createUserMock(),
			access: fakeData.token,
			refresh: fakeData.token
		}
	}

	metadata = {
		description: 'Create Token',
		group: CONTRACT_GROUP.AUTH,
		requestExample,
		responseExample,
	} satisfies Contract_Meta
}

export const createTokenContract = {
	name: 'Create Token',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

