import { group } from 'api/schemas'
import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { environmentVariable } from 'configuration/constants'
import { createGroupMock } from 'api/mocks'

const endpoint = {
	method: REQUEST_METHOD.PATCH,
	route: route.group.getById
} satisfies Contract_Endpoint

const schema = {
	request: {
		payload: group.omit({ id: true }).partial()
	},
	response: {
		status: 201,
		payload: group
	}
} satisfies Contract_DataSchema

export type UpdateGroupById_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type UpdateGroupById_RequestPayload = UpdateGroupById_Request['payload']

export type UpdateGroupById_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type UpdateGroupById_ResponsePayload = UpdateGroupById_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const group = createGroupMock()

	const requestExample: UpdateGroupById_Request = {
		payload: { ...group }
	}

	const responseExample: UpdateGroupById_Response = {
		status: 201,
		payload: group,
	}

	metadata = {
		description: 'Update Group by Id',
		group: CONTRACT_GROUP.GROUP,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const updateGroupByIdContract = {
	name: 'Update group by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

