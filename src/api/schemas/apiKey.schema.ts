import { z } from 'zod'

import { id } from './generic.schema'

export const apiKey = z.object({
	id,

	name: z.string().min(1).max(255), // todo add min constraint - Confirm whether an empty string should be allowed.
									  //      If not, consider enforcing non-whitespace characters (e.g., `.trim().min(1)`).
									  //      Also, verify if certain special characters should be restricted.

	is_active: z.boolean(),
	created_at: z.string().datetime().readonly(),
})

export type ApiKey = z.infer<typeof apiKey>
