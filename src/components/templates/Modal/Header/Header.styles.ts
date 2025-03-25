import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

const container: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	gap: 4,
	userSelect: 'none',
} as const

export default {
	container,
}
