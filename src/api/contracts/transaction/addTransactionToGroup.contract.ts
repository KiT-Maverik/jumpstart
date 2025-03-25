import { message } from 'api/schemas'
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
	route: route.transaction.addToGroup
} satisfies Contract_Endpoint

const schema = {
	response: {
		status: 200,
		payload: message
	}
} satisfies Contract_DataSchema

export type AddTransactionToGroup_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type AddTransactionToGroup_ResponsePayload = AddTransactionToGroup_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const responseExample: AddTransactionToGroup_Response = {
		status: 200,
		payload: {
			message: 'Transaction added to a group'
		}
	}

	metadata = {
		description: 'Add Transaction to group',
		group: CONTRACT_GROUP.TRANSACTION,
		responseExample,
	} satisfies Contract_Meta
}

export const addTransactionToGroupContract = {
	name: 'Add transaction to group',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
