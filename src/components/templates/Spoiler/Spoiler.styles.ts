import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

const spoiler: { container: SxProps<Theme>; first: SxProps<Theme>; last: SxProps<Theme> } = {
	container: {
		border: '1px solid',
		borderColor: theme => theme.palette.divider,
		overflow: 'hidden',
		borderBottom: 'none',
	},
	first: {
		borderTopLeftRadius: theme => theme.spacing(2),
		borderTopRightRadius: theme => theme.spacing(2),
	},
	last: {
		borderBottomLeftRadius: theme => theme.spacing(2),
		borderBottomRightRadius: theme => theme.spacing(2),
		borderBottom: '1px solid',
		borderColor: theme => theme.palette.divider,
	}
} as const

const header: {
	title: SxProps<Theme>;
	container: SxProps<Theme>;
	chevron: SxProps<Theme>
} = {
	title: {
		textAlign: 'left',
		flexGrow: 1,
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	container: {
		display: 'flex',
		gap: 3,
		width: 1,
		justifyContent: 'start',
		p: theme => theme.spacing(1, 3),
		flex: '1 1 auto',
		maxWidth: 1,
	},
	chevron: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		transition: 'all 0.15s ease-in-out',
	},
} as const

const content: { wrapper: SxProps<Theme>; container: SxProps<Theme> } = {
	wrapper: {
		overflow: 'hidden',
		maxHeight: 0,
		transition: 'max-height 0.15s ease-in-out',
	},
	container: {
		p: theme => theme.spacing(2, 3),
	},
} as const

export default {
	spoiler,
	content,
	header,
}
