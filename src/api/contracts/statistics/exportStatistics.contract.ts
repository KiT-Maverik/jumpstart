import { z } from 'zod'

import { STATISTIC_PERIOD, statisticFilteringParams } from 'api/schemas'
import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { environmentVariable } from 'configuration/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'

const endpoint = {
	method: REQUEST_METHOD.GET,
	route: route.statistics.export
} satisfies Contract_Endpoint

const schema = {
	request: {
		query: statisticFilteringParams
	},
	response: {
		status: 200,
		payload: z.object({
			pew: z.string() // TODO: get actual type. Put statistic entities
		})
	}
} satisfies Contract_DataSchema

export type ExportStatistics_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type ExportStatistics_Response = Contract_ApiSchemaConstructor<typeof schema.response>

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const requestExample: ExportStatistics_Request = {
		query: {
			company_ids: crypto.randomUUID(),
			group_ids: crypto.randomUUID(),
			end_date: new Date().toISOString(),
			start_date: new Date().toISOString(),
			period: STATISTIC_PERIOD.DAY
		}
	}

	const responseExample: ExportStatistics_Response = {
		status: 200,
		payload: {
			pew: 'pew'
		}
	}

	metadata = {
		description: 'Export statistics',
		group: CONTRACT_GROUP.STATISTICS,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}
export const exportStatisticsContract = {
	name: 'Export statistics',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
