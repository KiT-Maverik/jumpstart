import { route, REQUEST_METHOD, CONTRACT_GROUP } from 'api/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { environmentVariable } from 'configuration/constants'

const endpoint = {
	method: REQUEST_METHOD.DELETE,
	route: route.addon.getById
} satisfies Contract_Endpoint

const schema = {
	response: {
		status: 204
	}
} satisfies Contract_DataSchema

export type DeleteAddonById_Response = Contract_ApiSchemaConstructor<typeof schema.response>

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const responseExample: DeleteAddonById_Response = {
		status: 204
	}

	metadata = {
		description: 'Delete addon by Id',
		group: CONTRACT_GROUP.ADDON,
		responseExample,
	} satisfies Contract_Meta
}

export const deleteAddonByIdContract = {
	name: 'Delete addon by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
