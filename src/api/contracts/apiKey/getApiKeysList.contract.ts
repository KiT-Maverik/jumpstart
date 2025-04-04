import { z } from 'zod'

import { apiKey, paginator } from 'api/schemas'
import { CONTRACT_GROUP, defaultPaginator, REQUEST_METHOD, route } from 'api/constants'
import { createApiKeyMock } from 'api/mocks'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { environmentVariable } from 'configuration/constants'

const endpoint = {
	method: REQUEST_METHOD.GET,
	route: route.apiKey.root
} satisfies Contract_Endpoint

const schema = {
	request: {
		query: paginator
	},
	response: {
		status: 200,
		payload: z.object({
			count: z.number(),
			results: z.array(apiKey)
		}),
	}
} satisfies Contract_DataSchema

export type GetApiKeysList_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type GetApiKeysList_RequestQuery = GetApiKeysList_Request['query']

export type GetApiKeysList_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type GetApiKeysList_ResponsePayload = GetApiKeysList_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const requestExample: GetApiKeysList_Request = {
		query: defaultPaginator
	}

	const responseExample: GetApiKeysList_Response = {
		status: 200,
		payload: {
			count: 1,
			results: [createApiKeyMock()]
		},
	}

	metadata = {
		description: 'Get list of API key',
		group: CONTRACT_GROUP.API_KEY,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const getApiKeysListContract = {
	name: 'Get API key list',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

