import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

const header: { container: SxProps<Theme>; spacing: SxProps<Theme> } = {
	container: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 3,
		width: 1,
		height: 48,
	},
	spacing: {
		px: theme => theme.mixins.card.content.spacing
	}
} as const

const card: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'start',
	alignItems: 'center',
	flexDirection: 'column',
	position: 'relative',
} as const

const loader: SxProps<Theme> = { position: 'absolute', top: 0, left: 0, right: 0 } as const

const content: { container: SxProps<Theme>; divider: SxProps<Theme>; spacing: SxProps<Theme> } = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		flexGrow: 1,
		width: 1,
		minHeight: 300,
	},
	divider: { width: 1 },
	spacing: {
		p: theme => theme.mixins.card.content.spacing
	}
} as const

export default {
	card,
	header,
	loader,
	content,
}
