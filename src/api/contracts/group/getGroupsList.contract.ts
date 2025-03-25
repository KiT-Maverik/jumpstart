import { group, paginator } from 'api/schemas'
import { CONTRACT_GROUP, paginatorExample, REQUEST_METHOD, route } from 'api/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { environmentVariable } from 'configuration/constants'
import { createGroupsListMock } from 'api/mocks'
import { z } from 'zod'

const endpoint = {
	method: REQUEST_METHOD.GET,
	route: route.group.root
} satisfies Contract_Endpoint

const schema = {
	request: {
		query: paginator
	},
	response: {
		status: 200,
		payload: z.object({
			count: z.number(),
			results: z.array(group)
		}),
	}
} satisfies Contract_DataSchema

export type GetGroupsList_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type GetGroupsList_RequestQuery = GetGroupsList_Request['query']

export type GetGroupsList_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type GetGroupsList_ResponsePayload = GetGroupsList_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const requestExample: GetGroupsList_Request = {
		query: paginatorExample
	}

	const data = createGroupsListMock(5)

	const responseExample: GetGroupsList_Response = {
		status: 200,
		payload: {
			count: data.length,
			results: data
		},
	}

	metadata = {
		description: 'Get list of Groups',
		group: CONTRACT_GROUP.GROUP,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const getGroupsListContract = {
	name: 'Get groups list',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

