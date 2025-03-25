import {SxProps} from "@mui/material";
import {Theme} from "@mui/material/styles";

const container: SxProps<Theme> = {
    position: 'relative',
    backgroundColor: theme => theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    color: theme => theme.palette.primary.contrastText,
    textTransform: 'uppercase',
    cursor: 'pointer',

    '&:hover': {
        backgroundColor: theme => theme.palette.primary.dark,
    }
} as const

const active: SxProps<Theme> = {
    backgroundColor: theme => theme.palette.warning.main,
} as const

const notification: SxProps<Theme> = {
    height: 8,
    width: 8,
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: '50%',
    backgroundColor: theme => theme.palette.warning.main,
} as const

export default {
    container,
    notification,
	active,
}
