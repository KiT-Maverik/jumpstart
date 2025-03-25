import { z } from 'zod'

import { id } from './generic.schema'

export const company = z.object({
	id,

	name: z.string().min(1).max(255).readonly(), // todo add min-max constraints
												 //      - Confirm whether `.min(1)` is sufficient or if a non-whitespace constraint should be added.
												 //      - Consider using `.trim()` to prevent leading/trailing spaces from being counted as valid input.
												 //      - Verify if special characters (e.g., numbers, symbols, emojis) should be restricted or allowed.
												 //      - Ensure the `.max(255)` limit aligns with database constraints (e.g., `VARCHAR(255)`).
												 //      - If name uniqueness is required, determine whether it should be enforced here, at the API level,
												 //        or in the database.
												 //      - If name changes are not allowed, consider making this field immutable (`.readonly()`).

	description: z.string().min(5).optional(), // todo add min-max constraints
	//      - Confirm whether `.min(5)` is sufficient or if a non-whitespace constraint should be added.

	//      - Define an appropriate `.max()` constraint (e.g., `.max(500)`, `.max(1000)`)
											   //        to prevent excessive storage usage or UI rendering issues.
											   //      - Consider using `.trim()` to remove leading/trailing whitespace before validation.
											   //      - Determine whether multi-line descriptions (e.g., newlines) should be allowed or restricted.
											   //      - Check if any special character filtering is necessary (e.g., HTML tags, special symbols).
											   //      - Ensure consistency with other `description` fields in the system to maintain a uniform experience.

	created_at: z.string().datetime().readonly(), // Immutable field; ensure correct ISO format is used in the database.
})

export type Company = z.infer<typeof company>
