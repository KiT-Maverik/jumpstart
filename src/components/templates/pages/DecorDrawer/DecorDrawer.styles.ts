import { alpha, SxProps } from '@mui/material'
import {Theme} from "@mui/material/styles";

const container: SxProps<Theme> = {
    display: 'grid',
    gridTemplateColumns: '3fr 2fr',
    gap: 5,
    padding: 6,
	width: 0.9,
	backgroundColor: theme => theme.palette.action.disabled,
} as const

const paint: { container: SxProps<Theme>; item: SxProps<Theme> } = {
	container: {
		display: 'flex',
		gap: 5,
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	item: {
		width: 100,
		height: 'auto'
	}
} as const

const decal: { container: SxProps<Theme>; frame: SxProps<Theme>; image: SxProps<Theme> } = {
	frame: {
		display: 'flex',
		gap: 5,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	container: {
		display: 'flex',
		gap: 5,
		justifyContent: 'center',
		alignItems: 'center',
		width: 1,
	},
	image: {
		width: 1,
		height: 'auto',
	}
} as const

export default {
    container,
	paint,
	decal,
}
