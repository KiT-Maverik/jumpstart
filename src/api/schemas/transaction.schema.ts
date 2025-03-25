import { z } from 'zod'

import { id, maxNumber, minNumber } from './generic.schema'

export enum TRANSACTION_TYPE {
	SELL = 'sell',
	BUY = 'buy',
}

// todo need to define ORDER_TYPE enum. etc is not acceptable.
//      - Define all possible order types explicitly to prevent misuse or ambiguous values.
//      - Ensure consistency with API and business logic (e.g., should there be a "LIMIT" or "MARKET" order type?).
//      - If an unknown order type is encountered, determine if it should default to a specific value or be rejected.
export enum ORDER_TYPE {
	LONG = 'long',
	SHORT = 'short',
}

export const transaction = z.object({
	id,

	user: id,

	group: id.optional(),

	date: z.string().datetime(),

	investment: z.number().nonnegative().max(maxNumber),
	type: z.nativeEnum(TRANSACTION_TYPE),
	commission: z.number().nonnegative().max(maxNumber),
	profit: z.number().max(maxNumber).min(minNumber).optional(), // todo confirm is optional.
																 //      - Verify if `profit` can be omitted or if it should default to zero.
																 //      - Ensure backend logic accounts for missing values.

	is_custom: z.boolean({description: 'If True, user-created transaction; otherwise, generated from Deribit API.'}).optional().readonly(),

	transaction_link: z.string().url().optional(), // todo should be required if is_custom true
												   //      - Add conditional validation to enforce this when `is_custom === true`.
												   //      - Ensure this URL format aligns with expected Deribit API URLs.

	order_type: z.nativeEnum(ORDER_TYPE).optional(), // todo removed incorrect constraint maxLength: 20
													 // todo confirm is optional.
													 //      - Verify if `order_type` should always be present.
													 //      - If optional, should it have a default value?

	// todo add description Unique identifier of the trade from Deribit API
	trade_id: id.optional(), // todo removed incorrect constraint maxLength: 100. added uuid validation.
							 //      - Confirm whether trade IDs should always follow a UUID format.
							 //      - Verify that trade IDs are unique per transaction.

	instrument_name: z.string().optional(), // todo confirm max50 constraint. make this property required if is_custom fag is true?
											// todo confirm is optional.
											//      - Ensure this field aligns with expected Deribit instrument naming conventions.
											//      - Verify if a `.max(50)` constraint is appropriate.
											//      - Should it be required if `is_custom === true`?

	price: z.number({description: 'Price at which the trade was executed'}).nonnegative().max(maxNumber).min(minNumber).optional(),
	// todo confirm is optional.
	// todo minimum constraint seems extra. should be > 0
	//      - Verify whether the price should always be present.
	//      - If minimum is unnecessary, use `.gt(0)` instead of `.min()` for a stricter positive number check.

	amount: z.number().nonnegative().max(maxNumber).optional(), // todo removed min constraint as extra.
	// todo confirm is optional.
	//      - Ensure `amount` is always included if necessary for calculations.
	//      - If optional, check if a default value should be used.

	created_at: z.string().datetime().readonly(),
})

export type Transaction = z.infer<typeof transaction>
