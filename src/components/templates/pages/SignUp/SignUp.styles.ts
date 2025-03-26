import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

const stub: SxProps<Theme> = {
	position: 'absolute',
	inset: 0,
	background: theme => theme.palette.background.paper,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: 3,
	zIndex: 999999,
} as const

export default {
	stub
}
