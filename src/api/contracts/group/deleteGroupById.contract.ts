import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { environmentVariable } from 'configuration/constants'

const endpoint = {
	method: REQUEST_METHOD.DELETE,
	route: route.group.getById
} satisfies Contract_Endpoint

const schema = {
	response: {
		status: 204
	}
} satisfies Contract_DataSchema

export type DeleteGroupById_Response = Contract_ApiSchemaConstructor<typeof schema.response>

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const responseExample: DeleteGroupById_Response = {
		status: 204
	}

	metadata = {
		description: 'Delete Group by Id',
		group: CONTRACT_GROUP.GROUP,
		responseExample,
	} satisfies Contract_Meta
}

export const deleteGroupByIdContract = {
	name: 'Delete group by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

