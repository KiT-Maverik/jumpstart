import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

const container: SxProps<Theme> = {
	display: 'grid',
	gridTemplateColumns: 'min-content auto',
	alignItems: 'center',
	gap: 3,
	maxWidth: 300,
} as const

const metric: SxProps<Theme> = {
	flexGrow: 1,
	maxWidth: 200,
	height: '12px',
	borderRadius: 6,
} as const

export default {
	container,
	metric,
}
