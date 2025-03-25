import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { modalClasses } from '@mui/material'

import { ModalLayout } from './Modal.types'

export const modalMixin: { overlay: SxProps<Theme>; layout: (theme: Theme) => SxProps<Theme>; body: { pr: number } } = {
	overlay: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	layout: (theme) => ({
		width: 1,
		userSelect: 'none',
		minHeight: 220,
		outline: 'none',
		position: 'relative',
		gap: 5,
		overflow: 'auto',
		backgroundColor: theme.palette.background.paper,
		p: 5,
		mx: theme.mixins.contentSpacingX.sm,

		[theme.breakpoints.up('tablet')]: {
			mx: theme.mixins.contentSpacingX.lg,
		},
	}),
	body: {
		pr: 3,
	},
} as const

const overlay: { [key in ModalLayout]: SxProps<Theme> } = {
	window: {
		...modalMixin.overlay,
	},
	fullscreen: {
		...modalMixin.overlay,

		[`.${modalClasses.backdrop}`]: {
			backgroundColor: (theme) => theme.palette.background.paper,
		},
	},
} as const

const modal: {
	layout: { [key in ModalLayout]: (theme: Theme) => SxProps<Theme> }
	loader: SxProps<Theme>
} = {
	layout: {
		window: (theme: Theme) => ({
			...modalMixin.layout(theme),
			maxHeight: `calc(100vh - ${theme.spacing(6)})`,
			borderRadius: 2,

			[theme.breakpoints.only('mobile')]: {
				maxHeight: `calc(100vh - ${theme.spacing(16)})`,
			},
		}),
		fullscreen: (theme: Theme) => ({
			...modalMixin.layout(theme),
			maxWidth: theme.breakpoints.values.desktop,
		}),
	},
	loader: { position: 'absolute', top: 0, left: 0, width: 1 },
} as const

export default {
	modal,
	overlay,
}
