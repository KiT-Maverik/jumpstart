import { z, ZodSchema } from 'zod'

import { CONTRACT_GROUP, REQUEST_METHOD } from 'api/constants'
import { AsyncFunction } from 'type-fest/source/async-return-type'

export type Contract_ApiSchemaConstructor<Type> = {
	[Property in keyof Type]: Type[Property] extends ZodSchema ? z.infer<Type[Property]> : Type[Property];
};

export type StatusCode_Success = 200 | 201 | 204
export type StatusCode_Error = 400 | 401

type Contract_RequestSchema = {
	payload?: ZodSchema
	headers?: ZodSchema
	query?: ZodSchema
}

type Contract_ResponseSchema = {
	status: StatusCode_Success
	payload?: ZodSchema
	headers?: ZodSchema
}

export interface Contract_DataSchema {
	request?: Contract_RequestSchema
	response: Contract_ResponseSchema
}

export interface Contract_Endpoint {
	method: REQUEST_METHOD
	route: string | Function
}

export interface Contract_Meta {
	group: CONTRACT_GROUP
	description: string
	requestExample?: Contract_ApiSchemaConstructor<Contract_RequestSchema>
	responseExample: Contract_ApiSchemaConstructor<Contract_ResponseSchema>
}

export interface Contract extends Partial<Contract_Meta> {
	name: string
	endpoint: Contract_Endpoint
	execute?: AsyncFunction // todo make mandatory
	defaults?: object
	schema: {
		request?: Contract_RequestSchema
		response: Contract_ResponseSchema
	},
}
