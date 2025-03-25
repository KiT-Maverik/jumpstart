import { filter } from 'api/schemas'
import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { createFilterMock } from 'api/mocks'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint,
	Contract_Meta
} from 'api/types/contract'
import { environmentVariable } from 'configuration/constants'

const endpoint = {
	method: REQUEST_METHOD.POST,
	route: route.filter.root
} satisfies Contract_Endpoint

const schema = {
	request: {
		payload: filter.omit({ id: true })
	},
	response: {
		status: 201,
		payload: filter
	}
} satisfies Contract_DataSchema

export type CreateFilter_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type CreateFilter_RequestPayload = CreateFilter_Request['payload']

export type CreateFilter_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type CreateFilter_ResponsePayload = CreateFilter_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const filter  = createFilterMock()

	const requestExample: CreateFilter_Request = {
		payload: filter,
	}

	const responseExample: CreateFilter_Response = {
		status: 201,
		payload: filter,
	}

	metadata = {
		description: 'Create filter',
		group: CONTRACT_GROUP.FILTER,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const createFilterContract = {
	name: 'Create filter',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

