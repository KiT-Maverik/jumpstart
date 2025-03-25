import { Box, Chip, Typography } from '@mui/material'
import style from './Transaction.styles'

export enum TRANSACTION_TYPE {
	INCOME = 'income',
	EXPENSE = 'expense'
}

interface TransactionProps {
	date: string;
	index: number;
	total: number;
	type: TRANSACTION_TYPE;
}

export const Transaction = ({date, index, total, type}: TransactionProps) => {
	return (
		<Box sx={{display: 'flex', gap: 3, alignItems: 'center'}}>
			<Typography>{index}</Typography>
			<Typography>{date}</Typography>
			<Typography>{total}</Typography>
			<Chip color={style.transactionColor(type)} label={type}/>
		</Box>
	)
}
