import { Components, Theme, touchRippleClasses } from '@mui/material'

export const MuiIconButton: Components<Omit<Theme, 'components'>>['MuiIconButton'] = {
	styleOverrides: (() => {
		return {
			root: ({ theme: { palette }, ownerState: { variant, color } }) => {
				const getStyles = () => {
					if (variant === 'contained')
						return {
							backgroundColor: (() => {
								if (color === undefined || color === 'inherit' || color === 'default')
									return palette.primary.main
								else return palette[color].main
							})(),
							color: palette.background.paper,

							'&:hover': {
								backgroundColor: (() => {
									if (color === undefined || color === 'inherit' || color === 'default')
										return palette.primary.dark
									else return palette[color].dark
								})(),
							},
						}
					else if (variant === 'outlined')
						return {
							borderColor: palette.action.disabled,
							border: '1px solid',
						}
					else return {}
				}

				return {
					borderRadius: 4,
					overflow: 'hidden',

					[`.${touchRippleClasses.root}`]: {
						inset: -12,
					},

					...getStyles(),
				}
			},
		}
	})(),
	defaultProps: {
		variant: 'icon',
	},
}
