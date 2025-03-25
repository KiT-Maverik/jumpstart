import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import {
	Contract,
	Contract_ApiSchemaConstructor,
	Contract_DataSchema,
	Contract_Endpoint, Contract_Meta
} from 'api/types/contract'
import { environmentVariable } from 'configuration/constants'
import { DeleteAddonById_Response } from 'api/contracts'

const endpoint = {
	method: REQUEST_METHOD.DELETE,
	route: route.challengeType.getById
} satisfies Contract_Endpoint


const schema = {
	response: {
		status: 204
	}
} satisfies Contract_DataSchema

export type DeleteChallengeTypeById_Response = Contract_ApiSchemaConstructor<typeof schema.response>

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const responseExample: DeleteAddonById_Response = {
		status: 204
	}

	metadata = {
		description: 'Delete challenge type by Id',
		group: CONTRACT_GROUP.CHALLENGE_TYPE,
		responseExample,
	} satisfies Contract_Meta
}

export const deleteChallengeTypeByIdContract = {
	name: 'Delete challenge type by id',
	endpoint,
	schema,
	...metadata,
} satisfies Contract
