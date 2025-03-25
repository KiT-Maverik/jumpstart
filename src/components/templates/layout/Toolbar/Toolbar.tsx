'use client'

import UserIcon from '@mui/icons-material/PersonRounded'
import { AppBar, Box, Button } from '@mui/material'

import { ThemeSwitch } from 'components/organisms'

import style from './Toolbar.styles'

export const Toolbar = () => {

	return (
		<AppBar sx={style.appBar.container}>
			toolbar
			<Box sx={{ display: 'flex', gap: 5 }}>
				<ThemeSwitch />
				<Button variant="text" color="warning" size="large" startIcon={<UserIcon />}>
					User name
				</Button>
			</Box>
		</AppBar>
	)
}
