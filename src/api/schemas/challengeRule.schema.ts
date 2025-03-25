import { z } from 'zod'

import { id } from './generic.schema'

export const challengeRule = z.object({
	id,

	created_at: z.string().datetime().readonly(),

	companyId: id,

	description: z.string().min(5), // todo add min-max constraints
									//      - Ensure the maximum length is reasonable based on UI and storage limitations.
									//      - Consider setting a `.max(500)` constraint to prevent overly long descriptions.
									//		- define min constraint
									//      - Check if trimming whitespace before validation (`.trim()`) is necessary.
									//      - Verify if there are character restrictions (e.g., special symbols, newlines).
})

export type ChallengeRule = z.infer<typeof challengeRule>
