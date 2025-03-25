import { z } from 'zod'

export enum STATISTIC_PERIOD {
	DAY = 'Day',
	WEEK = 'Week',
	MONTH = 'Month',
	YEAR = 'Year',
}

// todo removed _total prefixes from all properties. be sync required
export const statisticGroupedData = z.object({
	date: z.string().datetime(),
	total_investment: z.number().nonnegative(), // todo  min = 0?
	total_profit: z.number(), // todo profit can be negative?
	total_commission: z.number().nonnegative(), // todo  min = 0?
	pnl: z.number(),
	roi: z.number()
})

// todo: add int check for numbers in contracts (be ignore)

export type StatisticGroupedData = z.infer<typeof statisticGroupedData>

export const statisticMetrics = z.object({
	pnl: z.number({ description: 'Profit and loss' }),
	roi: z.number({ description: 'Return on investment' })
})

export type StatisticMetrics = z.infer<typeof statisticMetrics>

export const statisticFilteringParams = z.object({
	company_ids: z.string().optional(),
	currency: z.string().optional(),
	end_date: z.string({ description: 'Format: YYYY-MM-DD' }).datetime({ local: true }).optional(),
	filter_name: z.string({ description: 'Required if save_filter=true' }).optional(),
	group_ids: z.string().optional(),
	period: z.nativeEnum(STATISTIC_PERIOD).optional(),
	start_date: z.string({ description: 'Format: YYYY-MM-DD' }).datetime({ local: true }).optional()
})

export type StatisticFilteringParams = z.infer<typeof statisticFilteringParams>
