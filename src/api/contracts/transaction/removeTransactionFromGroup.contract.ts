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
	method: REQUEST_METHOD.DELETE,
	route: route.transaction.removeFromGroup
} satisfies Contract_Endpoint

const schema = {
	response: {
		status: 200,
		payload: message
	}
} satisfies Contract_DataSchema

export type RemoveTransactionFromGroup_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type RemoveTransactionFromGroup_ResponsePayload = RemoveTransactionFromGroup_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const responseExample: RemoveTransactionFromGroup_Response = {
		status: 200,
		payload: {
			message: 'Transaction removed from group'
		}
	}

	metadata = {
		description: 'Remove Transaction from a group',
		group: CONTRACT_GROUP.TRANSACTION,
		responseExample,
	} satisfies Contract_Meta
}

export const removeTransactionFromGroupContract = {
	name: 'Remove transaction from group',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
