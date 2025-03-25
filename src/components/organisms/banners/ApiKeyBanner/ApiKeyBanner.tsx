'use client'

import { Alert, AlertTitle, Button } from '@mui/material'
import LogIcon from '@mui/icons-material/SmsFailedRounded'
import { useRouter } from 'next/navigation'

import { page } from 'configuration/constants'

export const ApiKeyBanner = () => {
	const router = useRouter()

	return (
		<Alert
			severity="warning"
			variant="filled"
			mode="banner"
			action={
				<Button
					variant="contained"
					startIcon={<LogIcon />}
					onClick={() => router.push(page.profile.href)}
					sx={{boxShadow: 0}}
				>
					Log message
				</Button>
			}
		>
			<AlertTitle>API key required</AlertTitle>
			You need to add an API key to start using the application.
		</Alert>
	)
}
