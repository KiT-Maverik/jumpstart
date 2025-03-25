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
	method: REQUEST_METHOD.GET,
	route: route.company.getById
} satisfies Contract_Endpoint

const schema = {
	response: {
		status: 201,
		payload: company
	}
} satisfies Contract_DataSchema

export type GetCompanyById_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type GetCompanyById_ResponsePayload = GetCompanyById_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const responseExample: GetCompanyById_Response = {
		status: 201,
		payload: createCompanyMock()
	}

	metadata = {
		description: 'Get Company by Id',
		group: CONTRACT_GROUP.COMPANY,
		responseExample,
	} satisfies Contract_Meta
}

export const getCompanyByIdContract = {
	name: 'Get company by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
