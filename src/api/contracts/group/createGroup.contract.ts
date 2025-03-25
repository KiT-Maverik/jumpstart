import { z } from 'zod'

import { group, id } from 'api/schemas'
import { CONTRACT_GROUP, REQUEST_METHOD, route } from 'api/constants'
import { createGroupMock } from 'api/mocks'
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
	route: route.group.root
} satisfies Contract_Endpoint

const schema = {
	request: {
		payload:
			group.pick({ balance: true, name: true })
				.merge(z.object({
					company: id,
					user: id,
					challenge_type: id,
					addons: z.array(id),
				})),
	},
	response: {
		status: 201,
		payload: group
	}
} satisfies Contract_DataSchema

export type CreateGroup_Request = Contract_ApiSchemaConstructor<typeof schema.request>
export type CreateGroup_RequestPayload = CreateGroup_Request['payload']

export type CreateGroup_Response = Contract_ApiSchemaConstructor<typeof schema.response>
export type CreateGroup_ResponsePayload = CreateGroup_Response['payload']

let metadata: undefined | Contract_Meta = undefined

if (process.env[environmentVariable.addMetaToContracts]) {
	const group = createGroupMock()

	const requestExample: CreateGroup_Request = {
		payload: {
			name: 'Group',
			balance: 100,
			user: fakeData.uuid,
			company: fakeData.uuid,
			challenge_type: fakeData.uuid,
			addons: [fakeData.uuid],
		},
	}

	const responseExample: CreateGroup_Response = {
		status: 201,
		payload: group,
	}

	metadata = {
		description: 'Create Group',
		group: CONTRACT_GROUP.GROUP,
		requestExample,
		responseExample
	} satisfies Contract_Meta
}

export const createGroupContract = {
	name: 'Create group',
	endpoint,
	schema,
	...metadata,
} satisfies Contract

