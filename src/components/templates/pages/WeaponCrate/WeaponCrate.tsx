'use client'

import style from './WeaponCrate.styles'
import { Box, Stack } from '@mui/material'

import { Rifle, RifleHighlights } from './Rifle/Rifle'
import {
	AdoptableStock,
	Compensator,
	Compensator2, FoldableStock,
	HeavyBarrel,
	IrScope,
	MuzzleBreaker,
	ShortBarrel,
	Silencer,
	MSeriesStock,
	SightScope,
	Pso,
	SniperScope1,
	SniperScope2,
	SniperScope3,
	SniperScope4,
	Eotech,
	RedDot,
	HeavyStock, Grip1, Grip2, Grip3, Handle1, Handle2, Handle3,

} from 'assets'
import { useCallback, useState } from 'react'

const highlightDefaults: RifleHighlights = {
	topRail: false,
	stock: false,
	sideRail: false,
	barrel: false,
	body: false,
	bottomRail: false,
	grip: false,
	clip: false,
}

interface CrateProps {
}

export const WeaponCrate = ({}: CrateProps) => {
	const [highlights, setHighlights] = useState<RifleHighlights>(highlightDefaults)

	const updateHighlight = useCallback(
		(newParams: Partial<RifleHighlights>) => setHighlights({...highlightDefaults, ...newParams})
		, [highlights])

	return (
			<Box sx={style.crate}>
				<Box sx={style.area.stock}>
					<AdoptableStock fill='white' width='100px' onClick={() => updateHighlight({stock: true})}/>
					<FoldableStock fill='white' width='200px' onClick={() => updateHighlight({stock: true})}/>
					<MSeriesStock fill='white' width='200px' onClick={() => updateHighlight({stock: true})}/>
					<HeavyStock fill='white' width='500px' onClick={() => updateHighlight({stock: true})}/>
				</Box>
				<Box sx={style.area.weapon}>
					<Rifle highlight={highlights} />
				</Box>
				<Box sx={style.area.topRail}>
					<Stack direction='row' gap={10}>
						<SightScope fill='white' width='50px' onClick={() => updateHighlight({topRail: true})}/>
						<Eotech fill='white' width='60px' onClick={() => updateHighlight({topRail: true})}/>
						<RedDot fill='white' width='80px' onClick={() => updateHighlight({topRail: true})}/>
					</Stack>
					<Stack direction='row' gap={10}>
						<Pso fill='white' width='170px' onClick={() => updateHighlight({topRail: true})}/>
						<SniperScope4 fill='white' width='160px' onClick={() => updateHighlight({topRail: true})}/>
					</Stack>
					<Stack direction='row' gap={10}>
						<SniperScope1 fill='white' width='260px' onClick={() => updateHighlight({topRail: true})}/>
						<SniperScope2 fill='white' width='250px' onClick={() => updateHighlight({topRail: true})}/>
						<SniperScope3 fill='white' width='250px' onClick={() => updateHighlight({topRail: true})}/>
					</Stack>
				</Box>
				<Box sx={style.area.bottomRail}>
					<Stack direction='row' gap={10}>
						<Grip1 fill='white' width='60px' onClick={() => updateHighlight({grip: true})}/>
						<Grip2 fill='white' width='70px' onClick={() => updateHighlight({grip: true})}/>
						<Grip3 fill='white' width='80px' onClick={() => updateHighlight({grip: true})}/>
					</Stack>
					<Stack direction='row' gap={10}>
						<Handle1 fill='white' width='30px' onClick={() => updateHighlight({bottomRail: true})}/>
						<Handle2 fill='white' width='50px' onClick={() => updateHighlight({bottomRail: true})}/>
						<Handle3 fill='white' width='30px' onClick={() => updateHighlight({bottomRail: true})}/>
					</Stack>
				</Box>
				<Box sx={style.area.sideRail}>
					<IrScope fill='white' width='140px' onClick={() => updateHighlight({bottomRail: true, topRail: true, sideRail: true})}/>
				</Box>
				<Box sx={style.area.barrel}>
					<HeavyBarrel fill='white' onClick={() => updateHighlight({barrel: true})}/>
					<Silencer fill='white' width='260px' onClick={() => updateHighlight({barrel: true})}/>
					<Compensator2 fill='white' width='200px' onClick={() => updateHighlight({barrel: true})}/>
					<Compensator fill='white' width='100px' onClick={() => updateHighlight({barrel: true})}/>
					<ShortBarrel fill='white' width='52px' onClick={() => updateHighlight({barrel: true})}/>
					<MuzzleBreaker fill='white' width='36px' onClick={() => updateHighlight({barrel: true})}/>
				</Box>
			</Box>
	)
}
