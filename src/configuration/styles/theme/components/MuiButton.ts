import { Components, Theme } from '@mui/material'

export const MuiButton: Components<Omit<Theme, 'components'>>['MuiButton'] = {
	styleOverrides: (() => {
		return {
			root: ({ theme: { palette }, ownerState: { variant, color } }) => ({
				color: color === 'secondary' && variant === 'contained' ? palette.background.paper : undefined,
			}),
		}
	})(),
}
