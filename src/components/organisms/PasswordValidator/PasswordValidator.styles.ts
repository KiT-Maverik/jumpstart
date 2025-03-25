import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

const container: SxProps<Theme> = {
	backgroundColor: (theme) => theme.palette.background.paper,
	boxShadow: (theme) => theme.shadows[5],
} as const

const rule: SxProps<Theme> = {
	display: 'flex',
	gap: 3,
	alignItems: 'center',
} as const

const arrow: SxProps<Theme> = {
	':before': {
		backgroundColor: (theme) => theme.palette.background.paper,
	},
} as const

export default {
	container,
	rule,
	arrow,
}
