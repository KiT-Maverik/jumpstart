import { addon } from 'api/schemas'
import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { createAddonMock } from 'api/mocks'
import { environmentVariable, fakeData } from 'configuration/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'

const endpoint = {
	method: REQUEST_METHOD.GET,
	route: route.addon.getById
} satisfies Contract_Endpoint

const schema = {
	response: {
		status: 200,
		payload: addon
	}
} satisfies Contract_DataSchema

export type GetAddonById_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type GetAddonById_ResponsePayload = GetAddonById_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const addon = createAddonMock({ id: fakeData.uuid})

	const responseExample: GetAddonById_Response = {
		status: 200,
		payload: addon
	}

	metadata = {
		description: 'Get addon by Id',
		group: CONTRACT_GROUP.ADDON,
		responseExample
	} satisfies Contract_Meta
}

export const getAddonByIdContract = {
	name: 'Get addon by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
