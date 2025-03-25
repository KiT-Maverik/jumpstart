import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { api } from 'configuration/api.client'
import { environmentVariable } from 'configuration/constants'

const endpoint = {
	method: REQUEST_METHOD.DELETE,
	route: route.internal.syncToken
} satisfies Contract_Endpoint

const schema = {
	response: {
		status: 204,
	}
} satisfies Contract_DataSchema

export type RemoveTokenFromServer_Response = Contract_ApiSchemaConstructor<typeof schema.response>

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {

	const responseExample: RemoveTokenFromServer_Response = {
		status: 204,
	}

	metadata = {
		description: 'Remove token from server',
		group: CONTRACT_GROUP.AUTH,
		responseExample
	} satisfies Contract_Meta
}

export const removeTokenFromServerContract = {
	name: 'Remove token from server',
	execute: async () =>
		await api[endpoint.method](endpoint.route, {
			baseURL: window.location.origin
		}),
	endpoint,
	schema,
	...metadata,
} satisfies Contract
