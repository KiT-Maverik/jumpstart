import { z } from 'zod'

import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { environmentVariable } from 'configuration/constants'

const endpoint = {
	method: REQUEST_METHOD.POST,
	route: route.internal.syncToken
} satisfies Contract_Endpoint

const schema = {
	request: {
		payload: z.object({
			token: z.string()
		})
	},
	response: {
		status: 201,
	}
} satisfies Contract_DataSchema

export type SyncTokenWithServer_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type SyncTokenWithServer_RequestPayload = SyncTokenWithServer_Request['payload']

export type SyncTokenWithServer_Response = Contract_ApiSchemaConstructor<typeof schema.response>

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const requestExample: SyncTokenWithServer_Request = {
		payload: {
			token: '1234567890'
		}
	}

	const responseExample: SyncTokenWithServer_Response = {
		status: 201,
	}

	metadata = {
		description: 'Sync token',
		group: CONTRACT_GROUP.AUTH,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const syncTokenWithServerContract = {
	name: 'Sync token with server',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
