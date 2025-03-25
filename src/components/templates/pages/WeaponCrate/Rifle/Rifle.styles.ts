import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

const silhouette: SxProps<Theme> = {
	g: {
		"&:hover": {
			fill: theme => theme.palette.warning.main,
		}
	}
} as const

export default {
	silhouette
}
