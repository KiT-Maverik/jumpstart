import style from './WeaponTile.styles'
import { Box, BoxProps, Typography, useTheme } from '@mui/material'
import { NotificationBadge } from 'components/atoms'
import { NineEleven } from './assets/1911'
import { Beretta } from './assets/Beretta'
import { FiveSeven } from './assets/FiveSeven'
import { Glock } from './assets/Glock'
import { DesertEagle } from './assets/DesertEagle'
import { Python } from './assets/Python'
import { Colt } from './manufacturers/Colt'
import { MagnumResearch } from './manufacturers/MagnumResearch'
import { FabricNationale } from './manufacturers/FabricNationale'
import { Glock as GlockLogo } from './manufacturers/Glock'
import { Beretta as BerettaLogo } from './manufacturers/Beretta'
import { useState } from 'react'
import LockIcon from '@mui/icons-material/LockRounded'
import UnlockIcon from '@mui/icons-material/LockOpenRounded'

type Weapons = '1911' | 'Python' | 'Glock 17' | '5-7' | 'Beretta 9mm' | 'Desert Eagle XIX'

interface CoverData {
	model: string;
	family: string;
	weapon: ({ fill }: { fill: string }) => JSX.Element;
	manufacturer: string
	logo: ({ fill }: { fill: string }) => JSX.Element;
}

const cover: { [key in Weapons]: CoverData } = {
	'1911': {
		family: 'Colt',
		model: '1911',
		manufacturer: 'Colt',
		weapon: NineEleven,
		logo: Colt,
	},
	'Python': {
		family: 'Colt',
		model: 'Python',
		manufacturer: 'Colt',
		weapon: Python,
		logo: Colt
	},
	'Desert Eagle XIX': {
		family: 'Desert Eagle',
		model: 'XIX',
		manufacturer: 'Magnum Research',
		weapon: DesertEagle,
		logo: MagnumResearch
	},
	'Beretta 9mm': {
		family: 'Beretta',
		model: '9mm',
		manufacturer: 'Beretta',
		weapon: Beretta,
		logo: BerettaLogo
	},
	'Glock 17': {
		family: 'Glock',
		model: '17',
		manufacturer: 'Glock',
		weapon: Glock,
		logo: GlockLogo
	},
	'5-7': {
		family: 'FN',
		model: '5-7',
		manufacturer: 'FN Herstal',
		weapon: FiveSeven,
		logo: FabricNationale
	}
}

interface WeaponTileProps extends BoxProps {
	locked: boolean
	notification: boolean
	weapon: Weapons
	useBrand?: boolean
}

export const WeaponTile = ({ notification, locked, weapon, useBrand = false, ...boxProps }: WeaponTileProps) => {
	const { palette } = useTheme()

	const [coverColor, setCoverColor] = useState(() => {
		if (locked) return palette.action.disabled
		return palette.primary.main
	})

	const [lock, setLock] = useState(() => {
		if (locked) return <LockIcon sx={style.lock} fill={palette.action.disabled} />
		else return null
	})

	const Cover =
		useBrand
			? cover[weapon].logo
			: cover[weapon].weapon

	return (
		<Box
			sx={[style.container, locked && style.locked]}
			onMouseOver={() => {
				if (!locked) return
				setLock(<UnlockIcon sx={style.lock} fill="red" />)
			}}
			onMouseLeave={() => {
				if (!locked) return
				setLock(<LockIcon sx={style.lock} fill={palette.action.disabled} />)
			}}
			{...boxProps}
		>
			<NotificationBadge show={notification} />
			{lock}
			<Box sx={style.cover.container}>
				<Cover fill={coverColor} />
			</Box>
			<Typography variant="subtitle1" textTransform="uppercase" fontStyle="italic">
				{useBrand ? cover[weapon].manufacturer : `${cover[weapon].family} ${cover[weapon].model}`}
			</Typography>
		</Box>
	)
}
