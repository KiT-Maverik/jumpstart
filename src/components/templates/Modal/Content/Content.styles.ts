import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import { modalMixin } from '../Modal.styles'

const container: SxProps<Theme> = {
	flexGrow: 1,
	position: 'relative',
	overflowY: 'auto',
	scrollbarGutter: 'stable',

	display: 'flex',
	flexDirection: 'column',
	gap: 3,

	// Start: scrollbar placement
	mr: -5,
	pr: modalMixin.body.pr,
	// End

	// Start: workaround to prevent first input label cutoff in Modal body
	mt: -2,
	pt: 2,
	// End

	'&::-webkit-scrollbar': {
		width: 8,
	},

	'&::-webkit-scrollbar-thumb': {
		backgroundColor: grey[300],
		borderRadius: '6px',

		'&:hover': {
			backgroundColor: grey[500],
		},
	},
} as const

export default {
	container
}
