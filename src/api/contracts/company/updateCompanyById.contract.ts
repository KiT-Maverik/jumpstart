import { company } from 'api/schemas'
import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { createCompanyMock } from 'api/mocks'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { environmentVariable } from 'configuration/constants'

const endpoint = {
	method: REQUEST_METHOD.PATCH,
	route: route.company.getById
} satisfies Contract_Endpoint

const schema = {
	request: {
		payload: company.pick({ name: true, description: true })
	},
	response: {
		status: 200,
		payload: company
	}
} satisfies Contract_DataSchema

export type UpdateCompanyById_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type UpdateCompanyById_RequestPayload = UpdateCompanyById_Request['payload']

export type UpdateCompanyById_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type UpdateCompanyById_ResponsePayload = UpdateCompanyById_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const company = createCompanyMock({ name: 'Updated Company', description: 'Updated description' })

	const requestExample: UpdateCompanyById_Request = {
		payload: company,
	}

	const responseExample: UpdateCompanyById_Response = {
		status: 200,
		payload: company,
	}

	metadata = {
		description: 'Update Company by Id',
		group: CONTRACT_GROUP.COMPANY,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const updateCompanyByIdContract = {
	name: 'Update company by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
