import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { TRANSACTION_TYPE } from 'api/schemas'

const container: SxProps<Theme> = {
	display: 'flex',
	gap: 3,
	alignItems: 'center',
	justifyContent: 'space-between',
	p: 3,
	width: 1,
	userSelect: 'none',
	cursor: 'pointer',

	'&:hover': {
		backgroundColor: (theme) => theme.palette.action.hover,
	}
} as const

const chip: (type: TRANSACTION_TYPE) => SxProps<Theme> = (type) => ({
	display: 'flex',
	gap: 1,
	color: type === TRANSACTION_TYPE.BUY ? 'success.main' : 'error.main',
}) as const

export default {
	container,
	chip,
}
