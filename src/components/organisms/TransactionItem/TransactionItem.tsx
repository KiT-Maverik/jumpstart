import ArrowUpIcon from '@mui/icons-material/ArrowDropUpRounded'
import ArrowDownIcon from '@mui/icons-material/ArrowDropDownRounded'
import { Box, Typography } from '@mui/material'

import { Transaction, TRANSACTION_TYPE } from 'api/schemas'
import { formatDate, prettifyNumber } from 'utils'

import style from './TransactionItem.styles'

type TransactionItemProps = {actions?: React.ReactNode} & Transaction

export const TransactionItem = ({ date, investment, type, instrument_name, actions }: TransactionItemProps) => {

	const renderChip = () => (
		<Box sx={style.chip(type)}>
			{type === TRANSACTION_TYPE.BUY ? <ArrowUpIcon color="inherit" /> : <ArrowDownIcon color="inherit" />}
			<Typography color="inherit" fontWeight="bold">{type === TRANSACTION_TYPE.BUY ? 'BUY' : 'SELL'}</Typography>
		</Box>
	)

	return (
			<Box sx={style.container}>
				<Typography flexGrow={1}>{formatDate(date)}</Typography>
				<Typography flexGrow={1}>{prettifyNumber(investment)}</Typography>
				<Typography flexGrow={1}>{instrument_name}</Typography>
				{renderChip()}
				{actions}
			</Box>
	)
}
