import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { environmentVariable } from 'configuration/constants'

const endpoint = {
	method: REQUEST_METHOD.DELETE,
	route: route.apiKey.getById
} satisfies Contract_Endpoint

const schema = {
	response: {
		status: 204
	}
} satisfies Contract_DataSchema

export type DeleteApiKeyById_Response = Contract_ApiSchemaConstructor<typeof schema.response>

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const responseExample: DeleteApiKeyById_Response = {
		status: 204
	}

	metadata = {
		description: 'Delete API key by Id',
		group: CONTRACT_GROUP.API_KEY,
		responseExample,
	} satisfies Contract_Meta
}

export const deleteApiKeyByIdContract = {
	name: 'Delete API key by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

