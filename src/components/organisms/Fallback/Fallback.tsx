'use client'

import { useRouter } from 'next/navigation'
import ErrorIcon from '@mui/icons-material/ReportGmailerrorredRounded'
import { Box, Button, Typography } from '@mui/material'

import { page } from 'configuration/constants'

import style from './Fallback.styles'

export const Fallback = () => {
	const router = useRouter()

	return (
		<Box sx={style.container}>
			<ErrorIcon sx={style.icon} />
			<Typography variant="h2">Oops, something went wrong!</Typography>
			<Button onClick={() => router.push(page.dashboard.href)}>Go home</Button>
		</Box>
	)
}
