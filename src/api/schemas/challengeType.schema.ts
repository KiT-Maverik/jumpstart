import { z } from 'zod'

import { id } from './generic.schema'

export const challengeType = z.object({
	id,

	name: z.string().min(1).max(255), // todo add min constraint
									  //      - Confirm if a minimum of 1 character is sufficient or if non-whitespace input should be enforced.
									  //      - Consider using `.trim()` to prevent leading/trailing spaces from affecting validation.
									  //      - Verify if any special characters should be restricted or allowed (e.g., only alphanumeric and dashes).

	description: z.string().min(5).optional(), // todo add min-max constraints
											   //      - Define an appropriate maximum length (e.g., `.max(500)` or `.max(1000)`) based on
											   //      - Define an appropriate minimum length (e.g., `.min(20)`) based on
											   //        UI, storage, or API constraints.
											   //      - Consider `.trim()` to prevent leading/trailing spaces.
											   //      - Determine whether multi-line descriptions (newlines) should be allowed.
											   //      - Ensure consistency with other `description` fields in the system.
})

export type ChallengeType = z.infer<typeof challengeType>
