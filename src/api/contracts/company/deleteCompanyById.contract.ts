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
	method: REQUEST_METHOD.DELETE,
	route: route.company.getById
} satisfies Contract_Endpoint

const schema = {
	response: {
		status: 204,
		payload: company
	}
} satisfies Contract_DataSchema

export type DeleteCompanyById_Response = Contract_ApiSchemaConstructor<typeof schema.response>

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {

	const responseExample: DeleteCompanyById_Response = {
		status: 204,
		payload: createCompanyMock()
	}

	metadata = {
		description: 'Delete Company by Id',
		group: CONTRACT_GROUP.COMPANY,
		responseExample
	} satisfies Contract_Meta
}

export const deleteCompanyByIdContract = {
	name: 'Update company by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
