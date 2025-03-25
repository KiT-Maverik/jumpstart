import { z } from 'zod'
import { id } from './generic.schema'

// todo renamed from group - Ensure all references in the project reflect this change.
//      If database or API responses still use "group," consider handling backward compatibility.
export const addon = z.object({
	id,

	name: z.string().min(1).max(255), // todo add min constraint - Confirm whether an empty string should be allowed.
									  //      If not, consider enforcing non-whitespace characters (e.g., `.trim().min(1)`).
									  //      Also, verify if certain special characters should be restricted.

	description: z.string().min(5).optional(), // todo add min-max constraints - Define an appropriate max and min length, e.g., 500 or 1000 characters,
											   //      based on UI, database, or API limitations. Ensure consistency with other description fields.
})

export type Addon = z.infer<typeof addon>

