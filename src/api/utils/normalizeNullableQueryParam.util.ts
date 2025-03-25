export const normalizeNullableQueryParam = (param?: string | null ) =>
	param || param === null ? param : undefined
