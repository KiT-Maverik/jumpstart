import { entityList_ResponsePayload_Schema, filter, paginator } from 'api/schemas'
import { CONTRACT_GROUP, defaultPaginator, REQUEST_METHOD, route } from 'api/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { environmentVariable } from 'configuration/constants'
import { createFilterMock } from 'api/mocks'

const endpoint = {
	method: REQUEST_METHOD.GET,
	route: route.filter.root
} satisfies Contract_Endpoint

const schema = {
	request: {
		query: paginator
	},
	response: {
		status: 200,
		payload: entityList_ResponsePayload_Schema(filter)
	}
} satisfies Contract_DataSchema

export type GetFiltersList_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type GetFiltersList_RequestQuery = GetFiltersList_Request['query']

export type GetFiltersList_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type GetFiltersList_ResponsePayload = GetFiltersList_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const requestExample: GetFiltersList_Request = {
		query: defaultPaginator
	}

	const responseExample: GetFiltersList_Response = {
		status: 200,
		payload: {
			count: 1,
			results: [createFilterMock()]
		},
	}

	metadata = {
		description: 'Get list of Filters',
		group: CONTRACT_GROUP.FILTER,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const getFiltersListContract = {
	name: 'Get filters list',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
