import {SxProps} from "@mui/material";
import {Theme} from "@mui/material/styles";

const container: SxProps<Theme> = {
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
}
