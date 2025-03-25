import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'


export enum AREA {
	NAVBAR = 'navbar',
	INFO = 'info',
	WIDGET = 'widget',
	WEAPON_SELECTOR = 'weaponSelector'
}

const crate: SxProps<Theme> = {
	position: 'relative',
	margin: 10,
	padding: 10,
	width: 1800,
	gap: 10,
	height: 720,
	borderRadius: 10,
	backgroundColor: 'darkgray',
	gridTemplateColumns: '6fr 3fr',
	display: 'grid',
	gridTemplateAreas: `
		'${AREA.NAVBAR} ${AREA.NAVBAR}'
		'${AREA.INFO} ${AREA.WIDGET}'
		'${AREA.WEAPON_SELECTOR} ${AREA.WEAPON_SELECTOR}'
	`,
} as const

const button: SxProps<Theme> = {
	display: 'flex',
	gap: 1,
	alignItems: 'center',
	justifyContent: 'center',
	width: 100,
	flexGrow: 1,
	cursor: 'pointer',
	border: theme => `4px solid ${theme.palette.info.light}`,
	borderRadius: 12,

	'&:hover': {
		backgroundColor: theme => theme.palette.info.light,
		color: 'white',
	}
} as const

const actions: SxProps<Theme> = {
	display: 'flex',
	gap: 10,
	justifyContent: 'space-between',
	width: 1,
	flexGrow: 1,
	cursor: 'pointer',
} as const

const metric: SxProps<Theme> = {
	flexGrow: 1,
	maxWidth: 200,
	height: '12px',
	borderRadius: 6,
} as const

const weaponSelector: SxProps<Theme> = {
	display: 'grid',
	gap: 3,
	alignItems: 'center',
	gridTemplateColumns: 'repeat(9, 1fr)',
	gridArea: AREA.WEAPON_SELECTOR,
} as const

export default {
	crate,
	button,
	actions,
	metric,
	weaponSelector,
}
