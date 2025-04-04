import { z } from 'zod'

import { id, paginator, STATISTIC_PERIOD, transaction, TRANSACTION_TYPE } from 'api/schemas'
import { CONTRACT_GROUP, defaultPaginator, REQUEST_METHOD, route, SORTING } from 'api/constants'
import { createTransactionMock } from 'api/mocks'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { createSortingQueryParam, describeNullableParam } from 'api/utils'
import { environmentVariable } from 'configuration/constants'

const endpoint = {
	method: REQUEST_METHOD.GET,
	route: route.transaction.root
} satisfies Contract_Endpoint

const schema = {
	request: {
		query:
			z.object({
				sort: z.string().optional(),
				filter_by_type: z.nativeEnum(TRANSACTION_TYPE).optional(),
				filter_by_period: z.nativeEnum(STATISTIC_PERIOD).optional(),
				group_id: id.nullable().optional().describe(describeNullableParam('transactions', 'group')),
				...paginator.shape,
			})
	},
	response: {
		status: 200,
		payload: z.object({
			count: z.number(),
			results: z.array(transaction)
		})
	}
} satisfies Contract_DataSchema

export type GetTransactionsList_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type GetTransactionsList_RequestQuery = GetTransactionsList_Request['query']

export type GetTransactionsList_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type GetTransactionsList_ResponsePayload = GetTransactionsList_Response['payload']

let metadata: undefined | Contract_Meta = undefined

const query = {
	group_id: null,
	filter_by_type: TRANSACTION_TYPE.BUY,
	filter_by_period: STATISTIC_PERIOD.YEAR,
	sort: createSortingQueryParam([['']]),
	...defaultPaginator,
} satisfies GetTransactionsList_RequestQuery

if (process.env[environmentVariable.addMetaToContracts]) {
	const requestExample: GetTransactionsList_Request = {
		query,
	}

	const responseExample: GetTransactionsList_Response = {
		status: 200,
		payload: {
			count: 1,
			results: [createTransactionMock()]
		}
	}

	metadata = {
		description: 'Get list of Transactions',
		group: CONTRACT_GROUP.TRANSACTION,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const getTransactionsListContract = {
	name: 'Get transactions list',
	endpoint,
	schema,
	defaults: {
		query
	},
	...metadata
} satisfies Contract

