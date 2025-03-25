import { alpha, SxProps } from '@mui/material'
import {Theme} from "@mui/material/styles";

const container: SxProps<Theme> = {
    flexGrow: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 5,
    margin: '24px',
    maxWidth: '100%',
} as const

const actionModal: SxProps<Theme> = {
    p: 5,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	color: 'white',
	background: theme => alpha(theme.palette.primary.main, theme.palette.action.disabledOpacity),
	cursor: 'pointer',
	width: 1,

	'&:hover' : {
		backgroundColor: theme => theme.palette.primary.main,
	}
} as const

export default {
    container,
	actionModal,
}
