import { filter } from 'api/schemas'
import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { createFilterMock } from 'api/mocks'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { environmentVariable } from 'configuration/constants'

const endpoint = {
	method: REQUEST_METHOD.GET,
	route: route.filter.getById
} satisfies Contract_Endpoint

const schema = {
	response: {
		status: 201,
		payload: filter
	}
} satisfies Contract_DataSchema

export type GetFilterById_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type GetFilterById_ResponsePayload = GetFilterById_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const responseExample: GetFilterById_Response = {
		status: 201,
		payload: createFilterMock()
	}

	metadata = {
		description: 'Get Filter by Id',
		group: CONTRACT_GROUP.FILTER,
		responseExample,
	} satisfies Contract_Meta
}

export const getFilterByIdContract = {
	name: 'Get filter by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
