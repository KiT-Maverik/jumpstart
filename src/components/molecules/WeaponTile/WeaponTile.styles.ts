import {alpha, SxProps} from "@mui/material";
import {Theme} from "@mui/material/styles";

const container: SxProps<Theme> = {
    borderColor: theme => theme.palette.primary.main,
    border: '4px solid',
    borderRadius: 6,
    color: theme => theme.palette.primary.main,

    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    cursor: 'pointer',
    p: 5,

    '&:hover': {
        borderColor: theme => theme.palette.primary.dark,
        backgroundColor: theme => alpha(theme.palette.primary.main, theme.palette.action.disabledOpacity),

    }
} as const

const locked: SxProps<Theme> = {
    borderColor: theme => theme.palette.action.disabled,
    color: theme => theme.palette.action.disabled,

    '&:hover': {
        borderColor: 'inherit',
        backgroundColor: 'inherit',
    }
} as const

const lock: SxProps<Theme> = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '40px',
    width: '40px',
    transform: 'translate(-50%, -50%)',
} as const

const cover: { container: SxProps<Theme>; img: SxProps<Theme> } = {
    container: {
        maxWidth: '100%',
        maxHeight: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexGrow: 1,
    },
    img: {
        width: 1,
        height: 'auto',
    }
} as const

export default {
    container,
    locked,
    cover,
    lock,
}
