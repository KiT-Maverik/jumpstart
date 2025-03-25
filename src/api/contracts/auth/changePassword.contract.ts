import { z } from 'zod'

import { password } from 'api/schemas'
import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { environmentVariable, fakeData } from 'configuration/constants'

const endpoint = {
	method: REQUEST_METHOD.POST,
	route: route.auth.password.change
} satisfies Contract_Endpoint

const schema = {
	request: {
		payload: z.object({
			old_password: z.string(),
			new_password: password
		})
	},
	response: {
		status: 200
	}
} satisfies Contract_DataSchema

export type ChangePassword_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type ChangePassword_RequestPayload = ChangePassword_Request['payload']

export type ChangePassword_Response = Contract_ApiSchemaConstructor<typeof schema.response>

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const requestExample: ChangePassword_Request = {
		payload: {
			old_password: fakeData.password,
			new_password: fakeData.password + 1,
		}
	}

	const responseExample: ChangePassword_Response = {
		status: 200
	}

	metadata = {
		description: 'Change password',
		group: CONTRACT_GROUP.AUTH,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const changePasswordContract = {
	name: 'Change password',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

