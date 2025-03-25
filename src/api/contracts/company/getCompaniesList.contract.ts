import z from 'zod'

import { company, paginator } from 'api/schemas'
import { CONTRACT_GROUP, paginatorExample, REQUEST_METHOD, route } from 'api/constants'
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
	route: route.company.root
} satisfies Contract_Endpoint

const schema = {
	request: {
		query: paginator
	},
	response: {
		status: 200,
		payload: z.object({
			count: z.number(),
			results: z.array(company)
		})
	}
} satisfies Contract_DataSchema

export type GetCompaniesList_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type GetCompaniesList_RequestQuery = GetCompaniesList_Request['query']

export type GetCompaniesList_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type GetCompaniesList_ResponsePayload = GetCompaniesList_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const requestExample: GetCompaniesList_Request = {
		query: paginatorExample
	}

	const responseExample: GetCompaniesList_Response = {
		status: 200,
		payload: {
			count: 1,
			results: [createCompanyMock()]
		},
	}

	metadata = {
		description: 'Get list of Companies',
		group: CONTRACT_GROUP.COMPANY,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const getCompaniesListContract = {
	name: 'Get companies list',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
