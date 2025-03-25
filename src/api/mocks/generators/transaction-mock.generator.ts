import { Transaction, TRANSACTION_TYPE } from 'api/schemas'

export const createTransactionMock: (transaction?: Partial<Omit<Transaction, 'id'>>) => Transaction = (transaction) => ({
	id: crypto.randomUUID(),
	group: transaction?.group ?? crypto.randomUUID(),
	user: transaction?.user ?? crypto.randomUUID(),
	date: transaction?.date ?? new Date().toISOString(),
	investment: transaction?.investment ?? 100,
	commission: transaction?.commission ?? 10,
	profit: transaction?.profit ?? 56,
	type: transaction?.type ?? TRANSACTION_TYPE.BUY,
	created_at: transaction?.created_at ?? new Date().toISOString(),
})
