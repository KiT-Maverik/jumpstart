import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

const container: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	height: '100vh',
	zIndex: 999999,
	position: 'absolute',
	inset: 0,
	backgroundColor: 'white',
} as const

export default {
	container
}
