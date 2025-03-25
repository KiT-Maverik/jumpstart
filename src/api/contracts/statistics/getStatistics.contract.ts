import { z } from 'zod'

import { statisticFilteringParams, statisticGroupedData } from 'api/schemas'
import { REQUEST_METHOD, route } from 'api/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint
} from 'api/types/contract'

const endpoint = {
	method: REQUEST_METHOD.GET,
	route: route.statistics.root
} satisfies Contract_Endpoint

const schema = {
	request: {
		query: statisticFilteringParams
	},
	response: {
		status: 200,
		payload: z.object({
			pnl: z.number(), // Constraints?
			roi: z.number() // Constraints?
		}).and(z.object({ time_series: z.array(statisticGroupedData) }))
	}
} satisfies Contract_DataSchema

export type GetStatistics_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type GetStatistics_QueryParams = GetStatistics_Request['query']

export type GetStatistics_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type GetStatistics_ResponsePayload = GetStatistics_Response['payload']

export const getStatisticsContract = {
	name: 'Get statistics',
	endpoint,
	schema
} satisfies Contract
