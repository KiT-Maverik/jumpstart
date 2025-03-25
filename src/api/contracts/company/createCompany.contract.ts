import { company } from 'api/schemas'
import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint,
	Contract_Meta
} from 'api/types/contract'
import { environmentVariable } from 'configuration/constants'
import { createCompanyMock } from 'api/mocks'

const endpoint = {
	method: REQUEST_METHOD.POST,
	route: route.company.root
} satisfies Contract_Endpoint

const schema = {
	request: {
		payload: company.pick({ name: true, description: true })
	},
	response: {
		status: 201,
		payload: company
	}
} satisfies Contract_DataSchema

export type CreateCompany_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type CreateCompany_RequestPayload = CreateCompany_Request['payload']

export type CreateCompany_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type CreateCompany_ResponsePayload = CreateCompany_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const company  = createCompanyMock()

	const requestExample: CreateCompany_Request = {
		payload: company,
	}

	const responseExample: CreateCompany_Response = {
		status: 201,
		payload: company,
	}

	metadata = {
		description: 'Create Company',
		group: CONTRACT_GROUP.COMPANY,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const createCompanyContract = {
	name: 'Create company',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

