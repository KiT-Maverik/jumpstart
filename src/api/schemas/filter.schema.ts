import { z } from 'zod'

import { id } from './generic.schema'

// todo why docs have no filters schema? clarify constraints
export const filter = z.object({
	id,
	name: z.string().min(1),
	user_id: id,
	filters: z.string(),
})

export type Filter = z.infer<typeof filter>

