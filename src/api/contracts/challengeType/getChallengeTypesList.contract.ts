import z from 'zod'

import { challengeType, paginator } from 'api/schemas'
import { CONTRACT_GROUP, defaultPaginator, REQUEST_METHOD, route } from 'api/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { environmentVariable } from 'configuration/constants'
import { createChallengeTypeMock } from 'api/mocks'

const endpoint = {
	method: REQUEST_METHOD.GET,
	route: route.challengeType.root
} satisfies Contract_Endpoint

const schema = {
	request: {
		query: paginator
	},
	response: {
		status: 200,
		payload: z.object({
			count: z.number(),
			results: z.array(challengeType)
		})
	}
} satisfies Contract_DataSchema

export type GetChallengeTypesList_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type GetChallengeTypesList_RequestQuery = GetChallengeTypesList_Request['query']

export type GetChallengeTypesList_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type GetChallengeTypesList_ResponsePayload = GetChallengeTypesList_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {

	const requestExample: GetChallengeTypesList_Request = {
		query: defaultPaginator
	}

	const data = createChallengeTypeMock()

	const responseExample: GetChallengeTypesList_Response = {
		status: 200,
		payload: {
			count: 1,
			results: [data]
		},
	}

	metadata = {
		description: 'Get list of challenge types',
		group: CONTRACT_GROUP.CHALLENGE_TYPE,
		requestExample,
		responseExample,
	} satisfies Contract_Meta
}

export const getChallengeTypesListContract = {
	name: 'Get challenge types List',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
