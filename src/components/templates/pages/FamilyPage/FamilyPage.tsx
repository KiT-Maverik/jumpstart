'use client'

import style from './FamilyPage.styles'
import { Tab } from '../../../atoms/Tab/Tab'
import { Box, Button, Stack, Typography } from '@mui/material'
import { WeaponTile } from '../../../molecules'
import { useState } from 'react'
import { Modal } from '../../Modal/Modal'
import { useRouter } from 'next/navigation'

interface StartProps {
}

export const FamilyPage = ({}: StartProps) => {
	const [title, setTitle] = useState('Colt')
	const [tabIndex, setTabIndex] = useState(0)
	const [showModal, setShowModal] = useState(false)

	const router = useRouter()

	return (
		<>
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 120 }}>
				{
					['pistols', 'shotguns', 'pdw', 'Battle rifles', 'sniper rifles', 'machine guns', 'melee', 'equipment']
						.map((label, index) =>
							<Tab label={label} notification={true} isActive={index === tabIndex} key={label}
								 onClick={() => {
									 router.push('category')
									 setTabIndex(index)
								 }} />
						)
				}
			</Box>
			<Box sx={style.container}>
				<WeaponTile  locked={false} notification={true}
							weapon="1911" />
				<WeaponTile  locked={true} notification={false}
							weapon="Python" onClick={() => setShowModal(true)} />
				<WeaponTile  locked={true} notification={false}
							weapon="1911" onClick={() => setShowModal(true)} />
				<WeaponTile  locked={true} notification={false}
							weapon="1911" onClick={() => setShowModal(true)} />
				<WeaponTile  locked={true} notification={false}
							weapon="1911" onClick={() => setShowModal(true)} />
				<WeaponTile  locked={true} notification={false}
							weapon="1911" onClick={() => setShowModal(true)} />
				<WeaponTile  locked={true} notification={false}
							weapon="1911" onClick={() => setShowModal(true)} />
				<WeaponTile  locked={true} notification={false}
							weapon="1911" onClick={() => setShowModal(true)} />
				<WeaponTile  locked={true} notification={false}
							weapon="1911" onClick={() => setShowModal(true)} />
				<WeaponTile  locked={true} notification={false}
							weapon="1911" onClick={() => setShowModal(true)} />

				<Modal
					showModal={showModal}
					onClose={() => setShowModal(false)}
					HeaderProps={{
						title: 'Unlock challenge'
					}}
				>
					<Typography>Kills: 0/50</Typography>
					<Typography>Headshot kills: 0/35</Typography>
					<Typography>Rounds won: 0/35</Typography>
					<Typography>Range kills (50m+): 0/35</Typography>
					<Stack gap={5} direction='row'>
						<Box sx={style.actionModal}>Add to notes</Box>
						<Box sx={style.actionModal}>Close</Box>
					</Stack>
				</Modal>
			</Box>
		</>
	)
}
