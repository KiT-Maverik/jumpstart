import { z, ZodSchema } from 'zod'

import { regex } from 'configuration/constants'

export const id = z.string().uuid().readonly()
export type Id = z.infer<typeof id>

export const tokens = z.object({
	refresh: z.string().readonly(),
	access: z.string().readonly(),
})
export type Tokens = z.infer<typeof tokens>

export enum SIGN_UP_METHOD {
	EMAIL = 'email',
	GOOGLE = 'google',
}

export const message = z.object({ message: z.string() })

export const apiError = z.object({
	status: z.union([z.literal(400), z.literal(401), z.literal(404), z.literal(500)]),
	payload: z.object({
		message: z.string()
	})
})
export type ApiError = z.infer<typeof apiError>
export type ApiError_Payload = ApiError['payload']

export const paginator = z.object({
	offset: z.number().int().nonnegative(),
	limit: z.union([z.literal(10), z.literal(25), z.literal(50), z.literal(100)])
})
export type Paginator = z.infer<typeof paginator>

// todo: fix typing results as any
export const entityList_ResponsePayload_Schema = (entity: ZodSchema) => z.object({
	count: z.number().int(),
	results: z.array(entity)
})

export const password = z
	.string()
	.min(8, 'Minimum length must be at least 8 characters')
	.max(50, 'Maximum length is 50 characters')
	.regex(regex.password.lowercase, 'Password should include at least 1 lowercase letter')
	.regex(regex.password.uppercase, 'Password should include at least 1 uppercase letter')
	.regex(regex.password.digit, 'Password should include at least 1 digit')
	.regex(regex.password.specialSymbol, 'Password should include at least 1 special symbol')

export const minNumber = -10000000
export const maxNumber = 10000000

export enum AUTH_TOKEN_TYPE {
	ACCESS = 'access',
	REFRESH = 'refresh',
}

export const authToken = z.object({
	exp: z.number(),
	iat: z.number(),
	jti: z.string(),
	user_id: z.string().uuid(),
})

export const accessToken = authToken.extend({ token_type: z.literal(AUTH_TOKEN_TYPE.ACCESS) })
export const refreshToken = authToken.extend({ token_type: z.literal(AUTH_TOKEN_TYPE.REFRESH) })

export type AccessTokenPayload = z.infer<typeof accessToken>
export type RefreshTokenPayload = z.infer<typeof refreshToken>
