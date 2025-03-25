import { z } from 'zod'

import { id } from './generic.schema'

export const user = z.object({
	id, // todo incorrect format. should be uuid
		//      - Ensure `id` is explicitly validated as a UUID (e.g., `.uuid()`).
		//      - Verify if UUID format is enforced at the database level.

	username: z.string().min(3).max(150), // todo add min-max constraint
										  //      - Confirm if `.min(3)` is sufficient (e.g., should usernames be longer for clarity?).
										  //      - Ensure `.max(150)` aligns with database constraints (e.g., `VARCHAR(150)`).
										  //      - Consider restricting special characters, spaces, or enforcing a specific pattern (`regex()`).
										  //      - Should username uniqueness be enforced here or only at the database/API level?

	email: z.string().email(), // todo confirm if additional validation is needed
							   //      - Ensure case-insensitive uniqueness is enforced at the database level.
							   //      - Consider trimming spaces and normalizing email format before validation.
							   //      - Check if certain disposable/temporary email domains should be restricted.

	password: z.string(),
})

export type User = z.infer<typeof user>
