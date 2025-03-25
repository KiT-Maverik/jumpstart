import { filter } from 'api/schemas'
import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { environmentVariable } from 'configuration/constants'
import { createFilterMock } from 'api/mocks'

const endpoint = {
	method: REQUEST_METHOD.PATCH,
	route: route.filter.getById
} satisfies Contract_Endpoint

const schema = {
	request: {
		payload: filter.omit({ id: true,}).partial()
	},
	response: {
		status: 200,
		payload: filter
	}
} satisfies Contract_DataSchema

export type UpdateFilterById_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type UpdateFilterById_RequestPayload = UpdateFilterById_Request['payload']

export type UpdateFilterById_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type UpdateFilterById_ResponsePayload = UpdateFilterById_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const filter = createFilterMock({ name: 'Updated Filter' })

	const requestExample: UpdateFilterById_Request = {
		payload: { name: filter.name },
	}

	const responseExample: UpdateFilterById_Response = {
		status: 200,
		payload: filter,
	}

	metadata = {
		description: 'Update Filter by Id',
		group: CONTRACT_GROUP.FILTER,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const updateFilterByIdContract = {
	name: 'Update filter by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
