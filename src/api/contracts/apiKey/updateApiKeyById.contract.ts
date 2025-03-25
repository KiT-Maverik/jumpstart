import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { createApiKeyMock } from 'api/mocks'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { apiKey } from 'api/schemas'
import { environmentVariable } from 'configuration/constants'

const endpoint = {
	method: REQUEST_METHOD.PATCH,
	route: route.apiKey.getById
} satisfies Contract_Endpoint

const schema = {
	request: {
		payload: apiKey.omit({ id: true })
	},
	response: {
		status: 200,
		payload: apiKey
	}
} satisfies Contract_DataSchema

export type UpdateApiKeyById_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type UpdateApiKeyById_RequestPayload = UpdateApiKeyById_Request['payload']

export type UpdateApiKeyById_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type UpdateApiKeyById_ResponsePayload = UpdateApiKeyById_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const apiKey = createApiKeyMock()

	const requestExample: UpdateApiKeyById_Request = {
		payload: { ...apiKey }
	}

	const responseExample: UpdateApiKeyById_Response = {
		status: 200,
		payload: apiKey,
	}

	metadata = {
		description: 'Update API key by Id',
		group: CONTRACT_GROUP.GROUP,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const updateApiKeyByIdContract = {
	name: 'Update API key by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

