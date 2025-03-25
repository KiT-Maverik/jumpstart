'use client'

import style from './CategoryPage.styles'
import { Tab } from 'components/atoms'
import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { WeaponTile } from '../../../molecules'
import { useState } from 'react'
import { Modal } from '../../Modal/Modal'
import { useRouter } from 'next/navigation'
import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnlockIcon from '@mui/icons-material/LockOpenRounded'
import { Navbar } from 'components/organisms'

interface StartProps {
}

export const CategoryPage = ({}: StartProps) => {
	const [tabIndex, setTabIndex] = useState(0)
	const [showModal, setShowModal] = useState(false)

	const router = useRouter()

	return (
		<>
			<Navbar/>
			<Box sx={style.container}>
				<WeaponTile locked={false} notification={true}
							weapon="1911" onClick={() => router.push('family')} />
				<WeaponTile locked={true} notification={false}
							weapon="Python" onClick={() => setShowModal(true)} />
				<WeaponTile locked={true} notification={false}
							weapon="Glock 17" onClick={() => setShowModal(true)} />
				<WeaponTile locked={true} notification={false}
							weapon="Desert Eagle XIX" onClick={() => setShowModal(true)} />
				<WeaponTile locked={true} notification={false}
							weapon="5-7" onClick={() => setShowModal(true)} />
				<WeaponTile locked={true} notification={false}
							weapon="Beretta 9mm" onClick={() => setShowModal(true)} />
				<WeaponTile locked={true} notification={false}
							weapon="1911" onClick={() => setShowModal(true)} />
				<WeaponTile locked={true} notification={false}
							weapon="1911" onClick={() => setShowModal(true)} />
				<WeaponTile locked={true} notification={false}
							weapon="1911" onClick={() => setShowModal(true)} />
				<WeaponTile locked={true} notification={false}
							weapon="1911" onClick={() => setShowModal(true)} />

				<Modal
					showModal={showModal}
					onClose={() => setShowModal(false)}
					HeaderProps={{
						children: <Stack direction='row' gap={3} alignItems='center'>
							<UnlockIcon color='disabled'/>
							<Typography variant='h4' fontStyle='italic' color='textSecondary'>Colt Python</Typography>
						</Stack>
					}}
				>
					<Divider>Challenge</Divider>

					<Stack direction='row' gap={3} alignItems='center'>
						<CircleIcon color='disabled'/>
						<Typography>Kills: 0/50</Typography>
					</Stack>

					<Stack direction='row' gap={3} alignItems='center'>
						<CircleIcon color='disabled'/>
						<Typography>Headshot kills: 0/35</Typography>
					</Stack>

					<Stack direction='row' gap={3} alignItems='center'>
						<CircleIcon color='disabled'/>
						<Typography>Rounds won: 0/35</Typography>
					</Stack>

					<Stack direction='row' gap={3} alignItems='center'>
						<CircleIcon color='disabled'/>
						<Typography>Range kills (50m+): 0/35</Typography>
					</Stack>

					<Divider>
						Target practice
					</Divider>
					<Stack direction='row' gap={3} alignItems='center'>
						<CheckCircleIcon color='success'/>
						<Typography flexGrow={1}>Static target: any pistol, 50m, 1 minute, 200pts+</Typography>
						<Button variant='outlined'>prepare</Button>
					</Stack>
					<Stack direction='row' gap={3} alignItems='center'>
						<CheckCircleIcon color='disabled'/>
						<Typography flexGrow={1}>Static target: 1911, 50m, 1min, 1 clip, 7 headshots</Typography>
						<Button variant='outlined'>prepare</Button>
					</Stack>
					<Stack direction='row' alignItems='center' gap={3}>
						<CircleIcon color='disabled'/>
						<Typography flexGrow={1}>Clear killhouse: pistol only, 1:30m, 300pts, no damage</Typography>
						<Button variant='outlined'>prepare</Button>
					</Stack>
					<Stack gap={5} direction='row' alignItems='center'>
						<Box sx={style.actionModal}>Add to notes</Box>
						<Box sx={style.actionModal}>Close</Box>
					</Stack>
				</Modal>
			</Box>
		</>
	)
}
