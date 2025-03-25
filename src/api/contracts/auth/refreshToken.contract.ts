import { z } from 'zod'

import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { environmentVariable } from 'configuration/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'

const endpoint = {
	method: REQUEST_METHOD.POST,
	route: route.auth.token.refresh
} satisfies Contract_Endpoint

const schema = {
	request: {
		payload: z.object({
			currentToken: z.string()
		})
	},
	response: {
		status: 201,
		payload: z.object({
			newToken: z.string()
		})
	}
} satisfies Contract_DataSchema

export type RefreshToken_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type RefreshToken_Response = Contract_ApiSchemaConstructor<typeof schema.response>

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const requestExample: RefreshToken_Request = {
		payload: {
			currentToken: '1234567890'
		}
	}

	const responseExample: RefreshToken_Response = {
		status: 201,
		payload: {
			newToken: '1234567890'
		}
	}

	metadata = {
		description: 'Refresh Token',
		group: CONTRACT_GROUP.AUTH,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const refreshTokenContract = {
	name: 'Refresh Token',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

