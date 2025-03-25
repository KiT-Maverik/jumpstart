'use client'

import { AREA, default as style } from './HoodCrate.styles'
import { Box, Stack, Typography } from '@mui/material'
import { Navbar } from '../../../organisms'
import { Stats } from './tabs/Stats/Stats'
import { useState } from 'react'
import { WeaponTile } from '../../../molecules'

export type HoodCrateTabs = 'stats' | 'compare'
interface CrateProps {
}

export const HoodCrate = ({}: CrateProps) => {
	const [tab, setTab] = useState<HoodCrateTabs>('stats')

	return (
			<Box sx={style.crate} height={60}>
				<Navbar gridArea={AREA.NAVBAR}/>
				<Box gridArea={AREA.INFO}>
					<Typography width={1} textAlign='center' variant='h3' textTransform='uppercase' fontWeight='bold'>
						M110 sniper rifle
						<Typography component='span' variant='h3' textTransform='lowercase' fontWeight='bold'>
							{" "}.357
						</Typography>
					</Typography>
					<Typography textAlign='justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
					<Box sx={style.actions}>
						<Stack flexGrow={3} direction='row' gap={3}>
							{
								tab === 'stats'
									? <Stats
										title='Stats'
										flexGrow={1}
										data={[
											{label: 'Damage', value: 80},
											{label: 'Accuracy', value: 90},
											{label: 'Range', value: 100},
											{label: 'Capacity', value: 10},
											{label: 'Handling', value: 60},
										]}
									/>
									: (
										<>
											<Stats
												title='M110'
												flexGrow={1}
												data={[
													{label: 'Damage', value: 80, color: 'success'},
													{label: 'Accuracy', value: 90, color: 'success'},
													{label: 'Range', value: 100, color: 'success'},
													{label: 'Capacity', value: 10, color: 'error'},
													{label: 'Fire rate', value: 20, color: 'error'},
												]}
											/>
											<Stats
												title='MR25'
												flexGrow={1}
												data={[
													{label: 'Damage', value: 40, color: 'error'},
													{label: 'Accuracy', value: 36, color: 'error'},
													{label: 'Range', value: 45, color: 'error'},
													{label: 'Capacity', value: 24, color: 'success'},
													{label: 'Fire rate', value: 80, color: 'success'},
												]}
											/>
										</>
									)
							}
						</Stack>
						<Stack gap={3} flexGrow={1}>
							<Box sx={style.button}>Attachments</Box>
							<Box sx={style.button} onClick={() => setTab('compare')}>Compare</Box>
							<Box sx={style.button}>Add to wall</Box>
							<Box sx={style.button}>Add to locker</Box>
						</Stack>
					</Box>
				</Box>
				<Box gridArea={AREA.WIDGET}>
					info
				</Box>
				<Box sx={style.weaponSelector}>
					<WeaponTile locked={false} notification={false} weapon='1911'/>
					<WeaponTile locked={false} notification={false} weapon='5-7'/>
					<WeaponTile locked={false} notification={true} weapon='Python'/>
					<WeaponTile locked={true} notification={false} weapon='Glock 17'/>
					<WeaponTile locked={true} notification={false} weapon='Desert Eagle XIX'/>
					<WeaponTile locked={true} notification={false} weapon='Beretta 9mm'/>
					<WeaponTile locked={true} notification={false} weapon='Beretta 9mm'/>
					<WeaponTile locked={true} notification={false} weapon='Beretta 9mm'/>
					<WeaponTile locked={true} notification={false} weapon='Beretta 9mm'/>
				</Box>
			</Box>
	)
}
