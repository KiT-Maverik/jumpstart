import { z } from 'zod'

import { SIGN_UP_METHOD, user } from 'api/schemas'
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
	route: route.auth.signUp
} satisfies Contract_Endpoint

const schema = {
	request: {
		payload:
			user.pick({ email: true, password: true, username: true })
				.merge(z.object({ method: z.nativeEnum(SIGN_UP_METHOD) }))
	},
	response: {
		status: 201,
	}
} satisfies Contract_DataSchema

export type SignUp_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type SignUp_RequestPayload = SignUp_Request['payload']

export type SignUp_Response = Contract_ApiSchemaConstructor<typeof schema.response>

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const requestExample: SignUp_Request = {
		payload: {
			email: fakeData.email,
			method: SIGN_UP_METHOD.EMAIL,
			username: fakeData.username,
			password: fakeData.password
		}
	}

	const responseExample: SignUp_Response = {
		status: 201,
	}

	metadata = {
		description: 'Sign Up',
		group: CONTRACT_GROUP.AUTH,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const signUpContract = {
	name: 'Sign Up',
	endpoint,
	schema,
	...metadata
} satisfies Contract

