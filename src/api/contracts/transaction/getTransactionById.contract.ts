import { transaction } from 'api/schemas'
import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { createTransactionMock } from 'api/mocks'
import { environmentVariable } from 'configuration/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'

const endpoint = {
	method: REQUEST_METHOD.GET,
	route: route.transaction.getById
} satisfies Contract_Endpoint

const schema = {
	response: {
		status: 200,
		payload: transaction
	}
} satisfies Contract_DataSchema

export type GetTransactionById_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type GetTransactionById_ResponsePayload = GetTransactionById_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const responseExample: GetTransactionById_Response = {
		status: 200,
		payload: createTransactionMock()
	}

	metadata = {
		description: 'Get Transaction by Id',
		group: CONTRACT_GROUP.TRANSACTION,
		responseExample,
	} satisfies Contract_Meta
}

export const getTransactionByIdContract = {
	name: 'Delete transaction by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
