import { z } from 'zod'

import { apiKey } from 'api/schemas'
import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { createApiKeyMock } from 'api/mocks'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint,
	Contract_Meta
} from 'api/types/contract'
import { environmentVariable, fakeData } from 'configuration/constants'

const endpoint = {
	method: REQUEST_METHOD.POST,
	route: route.apiKey.root
} satisfies Contract_Endpoint

const schema = {
	request: {
		payload:
			apiKey.pick({ name: true, is_active: true })
				.merge(z.object({
					client_id: z.string(),
					api_secret: z.string(),
				})),
	},
	response: {
		status: 201,
		payload: apiKey
	}
} satisfies Contract_DataSchema

export type CreateApiKey_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type CreateApiKey_RequestPayload = CreateApiKey_Request['payload']

export type CreateApiKey_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type CreateApiKey_ResponsePayload = CreateApiKey_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const apiKey = createApiKeyMock()

	const requestExample: CreateApiKey_Request = {
		payload: {
			name: 'New API key',
			is_active: true,
			client_id: fakeData.uuid,
			api_secret: 'secret string',
		},
	}

	const responseExample: CreateApiKey_Response = {
		status: 201,
		payload: apiKey,
	}

	metadata = {
		description: 'Create API key',
		group: CONTRACT_GROUP.API_KEY,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const createApiKeyContract = {
	name: 'Create API key',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

