import { addon } from 'api/schemas'
import { route, REQUEST_METHOD, CONTRACT_GROUP } from 'api/constants'
import { createAddonMock } from 'api/mocks'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint,
	Contract_Meta
} from 'api/types/contract'
import { environmentVariable, fakeData } from 'configuration/constants'

const endpoint = {
	method: REQUEST_METHOD.POST,
	route: route.addon.root
} satisfies Contract_Endpoint

const schema = {
	request: {
		payload: addon.omit({ id: true })
	},
	response: {
		status: 201,
		payload: addon
	}
} satisfies Contract_DataSchema

export type CreateAddon_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type CreateAddon_RequestPayload = CreateAddon_Request['payload']

export type CreateAddon_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type CreateAddon_ResponsePayload = CreateAddon_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const addon = createAddonMock({ id: fakeData.uuid })

	const requestExample: CreateAddon_Request = {
		payload: addon
	}

	const responseExample: CreateAddon_Response = {
		status: 201,
		payload: addon
	}

	metadata = {
		description: 'Create addon',
		group: CONTRACT_GROUP.ADDON,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const createAddonContract = {
	name: 'Create addon',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
