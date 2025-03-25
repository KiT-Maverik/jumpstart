import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { environmentVariable } from 'configuration/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'

const endpoint = {
	method: REQUEST_METHOD.GET,
	route: route.user.confirmEmail
} satisfies Contract_Endpoint

const schema = {
	response: {
		status: 200,
	}
} satisfies Contract_DataSchema

export type ConfirmUsersEmail_Response = Contract_ApiSchemaConstructor<typeof schema.response>

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const responseExample: ConfirmUsersEmail_Response = {
		status: 200,
	}

	metadata = {
		description: 'Confirm user email',
		group: CONTRACT_GROUP.USER,
		responseExample,
	} satisfies Contract_Meta
}

export const confirmUsersEmailContract = {
	name: 'Confirm user email',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

