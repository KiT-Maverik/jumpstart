'use client'

import { Box, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { page } from 'configuration/constants'

export const Navigation = () => {
	const router = useRouter()

	return (
		<Box sx={{display: 'flex', gap: 3, alignItems: 'center', m: '0 auto', justifyContent: 'center'}}>
			<Button onClick={() => router.push(page.dashboard.href)}>Dashboard</Button>
			<Button onClick={() => router.push(page.stats.href)}>Stats</Button>
			<Button onClick={() => router.push(page.groups.href)}>Groups</Button>
			<Button onClick={() => router.push(page.profile.href)}>Profile</Button>
		</Box>
	)
}
