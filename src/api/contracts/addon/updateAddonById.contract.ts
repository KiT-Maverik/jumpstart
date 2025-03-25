import { addon } from 'api/schemas'
import { route, REQUEST_METHOD, CONTRACT_GROUP } from 'api/constants'
import { createAddonMock } from 'api/mocks'
import { environmentVariable, fakeData } from 'configuration/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema, Contract_Endpoint, Contract_Meta
} from 'api/types/contract'

const endpoint = {
	method: REQUEST_METHOD.PATCH,
	route: route.addon.getById
} satisfies Contract_Endpoint

const schema = {
	request: {
		payload: addon.pick({ name: true, description: true }).partial()
	},
	response: {
		status: 200,
		payload: addon
	}
} satisfies Contract_DataSchema

export type UpdateAddonById_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type UpdateAddonById_RequestPayload = UpdateAddonById_Request['payload']

export type UpdateAddonById_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type UpdateAddonById_ResponsePayload = UpdateAddonById_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const addon = createAddonMock({
		id: fakeData.uuid,
		name: 'Updated addon Name',
		description: 'Updated addon Description'
	})

	const requestExample: UpdateAddonById_Request = {
		payload: {
			name: addon.name,
			description: addon.description,
		},
	}

	const responseExample: UpdateAddonById_Response = {
		status: 200,
		payload: addon,
	}

	metadata = {
		description: 'Update addon by Id',
		group: CONTRACT_GROUP.ADDON,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const updateAddonByIdContract = {
	name: 'Update addon by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
