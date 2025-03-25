import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

export enum AREA {
	STOCK = 'stock',
	HANDLE = 'handle',
	CLIP = 'clip',
	SIDE_RAIL = 'sideRail',
	WEAPON = 'weapon',
	TOP_RAIL = 'topRail',
	BOTTOM_RAIL = 'bottomRail',
	BARREL = 'barrel',
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
	gridTemplateColumns: '20% auto 20%',
	display: 'grid',
	gridTemplateAreas: `
		'${AREA.STOCK} ${AREA.TOP_RAIL} ${AREA.SIDE_RAIL}'
		'${AREA.STOCK} ${AREA.WEAPON} ${AREA.BARREL}'
		'${AREA.STOCK} ${AREA.BOTTOM_RAIL} ${AREA.BARREL}'
	`,
} as const

const area: {
	[key in AREA]?: SxProps<Theme>
} = {
	[AREA.STOCK]: {
		display: 'flex',
		flexDirection: 'column',
		gap: 5,
		justifyContent: 'center',
		alignItems: 'center',
		gridArea: AREA.STOCK,
		border: '1px solid lightgray',
	},
	[AREA.TOP_RAIL]: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		gridArea: AREA.TOP_RAIL,
		border: '1px solid lightgray',
	},
	[AREA.SIDE_RAIL]: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: 5,
		justifyContent: 'center',
		alignItems: 'center',
		gridArea: AREA.SIDE_RAIL,
		border: '1px solid lightgray',
	},
	[AREA.BARREL]: {
		display: 'flex',
		flexDirection: 'column',
		gap: 5,
		gridArea: AREA.BARREL,
		border: '1px solid lightgray',
	},
	[AREA.BOTTOM_RAIL]: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 5,
		gridArea: AREA.BOTTOM_RAIL,
		border: '1px solid lightgray',
	},
} as const

export default {
	crate,
	area,
}
