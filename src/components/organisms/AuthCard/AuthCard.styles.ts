import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

const card: SxProps<Theme> = {
	display: 'flex',
	flexDirection: 'column',
	gap: 5,
	p: 5,
	backgroundColor: '#fff',
	borderRadius: 5,
	width: 350,
	position: 'relative'
} as const

const actions: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	gap: 5,
} as const

export default {
	actions,
	card,
}
