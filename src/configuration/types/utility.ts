import { ZodObject, ZodSchema } from 'zod'

export const colors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const
export type Color = (typeof colors)[number]

export const sizes = ['small', 'medium', 'large'] as const
export type Size = (typeof sizes)[number]

/**
 * Utility type intended to be used,
 * when you need a temporary 'any' placeholder type
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type T_TodoAny = any

export type ObjectToZodSchema<T> = ZodObject<{
	[key in keyof T]: ZodSchema
}>

/**
 * Make object properties required recursively
 */
export type DeepRequired<T> = {
	[K in keyof T]-?: NonNullable<T[K]> extends object
		? DeepRequired<NonNullable<T[K]>>
		: NonNullable<T[K]>;
};


/**
 * Make object properties optional recursively
 */
export type DeepPartial<T> = {
	[K in keyof T]?: T[K] extends object
		? T[K] extends Array<infer U>
			? Array<DeepPartial<U>>
			: DeepPartial<T[K]>
		: T[K];
};


