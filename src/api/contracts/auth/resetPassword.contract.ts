import { z } from 'zod'

import { password } from 'api/schemas'
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
		payload: z.object({
			currentPassword: password,
			newPassword: password
		})
	},
	response: {
		status: 200
	}
} satisfies Contract_DataSchema

export type ResetPassword_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type ResetPassword_RequestPayload = ResetPassword_Request['payload']

export type ResetPassword_Response = Contract_ApiSchemaConstructor<typeof schema.response>

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const requestExample: ResetPassword_Request = {
		payload: {
			currentPassword: fakeData.password,
			newPassword: fakeData.password + 1,
		}
	}

	const responseExample: ResetPassword_Response = {
		status: 200
	}

	metadata = {
		description: 'Reset password',
		group: CONTRACT_GROUP.AUTH,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const resetPasswordContract = {
	name: 'Reset password',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

