import { z } from 'zod'

import { id, maxNumber, minNumber } from './generic.schema'
import { addon } from './addon.schema'
import { company } from './company.schema'
import { challengeType } from './challengeType.schema'

export const group = z.object({
	id,

	user: id,

	company, // TODO: group can change company? readonly?
				 //      - If a challenge should always belong to the same company, consider marking this as readonly.
				 //      - If challenges can be transferred between companies, ensure there’s a proper validation mechanism.
				 //      - If readonly, confirm whether enforcement should happen at the database level or only in business logic.

	challenge_type: challengeType, // TODO: group can change challenge type? readonly?
						//      - If the challenge type defines core business logic (e.g., affects calculations or workflows),
						//        consider making this readonly after creation.
						//      - If changes are allowed, define who can modify it and under what conditions.

	addons: z.array(addon), // TODO: update when resolved
						 //      - Should this be a fixed array (e.g., only set at creation), or can addons be added/removed later?
						 //      - If updates are allowed, define validation rules for modifications (e.g., max length, duplicates).

	name: z.string().min(3), // todo i made name required -
	balance: z.number().min(minNumber).max(maxNumber), // todo can be negative? remove min constraint if not.
	//      - If balance cannot be negative, remove `minNumber` or explicitly set `.min(0)`.
	//      - What does `exclusiveMaximum` mean?

	is_archived: z.boolean().optional(),
})

export type Group = z.infer<typeof group>
