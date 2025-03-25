import { PaletteOptions } from '@mui/material/styles'
import { grey, cyan, blueGrey } from '@mui/material/colors'

export const paletteLight: PaletteOptions = {
	mode: 'light',
	primary: {
		main: cyan[700],
		light: cyan[500],
		dark: cyan[900],
	},
	secondary: {
		main: blueGrey[700],
		light: blueGrey[500],
		dark: blueGrey[900],
	},
	background: {
		surface: grey['200'],
	},
}
