import { group } from 'api/schemas'
import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { createGroupMock } from 'api/mocks'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { environmentVariable } from 'configuration/constants'

const endpoint = {
	method: REQUEST_METHOD.GET,
	route: route.group.getById
} satisfies Contract_Endpoint

const schema = {
	response: {
		status: 200,
		payload: group
	}
} satisfies Contract_DataSchema

export type GetGroupById_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type GetGroupById_ResponsePayload = GetGroupById_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const responseExample: GetGroupById_Response = {
		status: 200,
		payload: createGroupMock()
	}

	metadata = {
		description: 'Get Group by Id',
		group: CONTRACT_GROUP.GROUP,
		responseExample
	} satisfies Contract_Meta
}

export const getGroupByIdContract = {
	name: 'Get group by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

