import { user } from 'api/schemas'

import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { environmentVariable, fakeData } from 'configuration/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'

const endpoint = {
	method: REQUEST_METHOD.POST,
	route: route.auth.password.reset
} satisfies Contract_Endpoint

const schema = {
	request: {
		payload: user.pick({ email: true })
	},
	response: {
		status: 200
	}
} satisfies Contract_DataSchema

export type RestorePassword_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type RestorePassword_RequestPayload = RestorePassword_Request['payload']

export type RestorePassword_Response = Contract_ApiSchemaConstructor<typeof schema.response>

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const requestExample: RestorePassword_Request = {
		payload: {
			email: fakeData.email,
		}
	}

	const responseExample: RestorePassword_Response = {
		status: 200
	}

	metadata = {
		description: 'Restore Password',
		group: CONTRACT_GROUP.AUTH,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const restorePasswordContract = {
	name: 'Restore password',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

