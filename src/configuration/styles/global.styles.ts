import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

export const globalStyles: { main: SxProps<Theme>; body: SxProps<Theme> } = {
	body: {
		p: '0 !important',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		height: '100vh',
		width: '100vw',
	},
	main: {
		flexGrow: 1,
	}
} as const
