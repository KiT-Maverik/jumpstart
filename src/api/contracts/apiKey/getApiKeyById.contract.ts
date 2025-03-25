import { apiKey } from 'api/schemas'
import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
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
	route: route.apiKey.getById
} satisfies Contract_Endpoint

const schema = {
	response: {
		status: 200,
		payload: apiKey
	}
} satisfies Contract_DataSchema

export type GetApiKeyById_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type GetApiKeyById_ResponsePayload = GetApiKeyById_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const responseExample: GetApiKeyById_Response = {
		status: 200,
		payload: createApiKeyMock()
	}

	metadata = {
		description: 'Get API key by Id',
		group: CONTRACT_GROUP.API_KEY,
		responseExample
	} satisfies Contract_Meta
}

export const getApiKeyByIdContract = {
	name: 'Get API key by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

