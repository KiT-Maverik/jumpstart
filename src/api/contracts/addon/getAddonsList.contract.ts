import z from 'zod'

import { CONTRACT_GROUP, paginatorExample, REQUEST_METHOD, route } from 'api/constants'
import { createAddonMock } from 'api/mocks'
import { addon, paginator } from 'api/schemas'
import { environmentVariable, fakeData } from 'configuration/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'

const endpoint = {
	method: REQUEST_METHOD.GET,
	route: route.addon.root
} satisfies Contract_Endpoint

const schema = {
	request: {
		query: paginator
	},
	response: {
		status: 200,
		payload: z.object({
			count: z.number(),
			results: z.array(addon)
		})
	}
} satisfies Contract_DataSchema

export type GetAddonList_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type GetAddonList_Query = GetAddonList_Request['query']

export type GetAddonList_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type GetAddonList_ResponsePayload = GetAddonList_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const addon = createAddonMock({ id: fakeData.uuid })

	const requestExample: GetAddonList_Request = {
		query: paginatorExample
	}

	const responseExample: GetAddonList_Response = {
		status: 200,
		payload: {
			count: 1,
			results: [addon]
		}
	}

	metadata = {
		description: 'Get list of addons',
		group: CONTRACT_GROUP.ADDON,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const getAddonsListContract = {
	name: 'Get addons List',
	endpoint,
	schema,
	...metadata
} satisfies Contract
