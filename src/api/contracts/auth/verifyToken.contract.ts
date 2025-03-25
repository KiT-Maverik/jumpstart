import { z } from 'zod'

import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { createUserMock } from 'api/mocks'
import { user } from 'api/schemas'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { environmentVariable, fakeData } from 'configuration/constants'

const endpoint = {
	method: REQUEST_METHOD.POST,
	route: route.auth.token.verify
} satisfies Contract_Endpoint

const schema = {
	request: {
		payload: z.object({
			token: z.string()
		})
	},
	response: {
		status: 200,
		payload: z.object({ user }),
	}
} satisfies Contract_DataSchema

export type VerifyToken_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type VerifyToken_RequestPayload = VerifyToken_Request['payload']

export type VerifyToken_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type VerifyToken_ResponsePayload = VerifyToken_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const requestExample: VerifyToken_Request = {
		payload: {
			token: fakeData.token,
		}
	}

	const responseExample: VerifyToken_Response = {
		status: 200,
		payload: { user: createUserMock() }
	}

	metadata = {
		description: 'Verify Token',
		group: CONTRACT_GROUP.AUTH,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const verifyTokenContract = {
	name: 'Verify Token',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
