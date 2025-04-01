import { Box, SxProps } from '@mui/material'

import { Theme } from '@mui/material/styles'
import { grey } from '@mui/material/colors'

export default async function AuthLayout({
											 children
										 }: Readonly<{
	children: React.ReactNode
}>) {

	const wrapperStyle: SxProps<Theme> = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		height: '100vh',
		backgroundColor: grey[200]
	} as const

	return (
		<Box sx={wrapperStyle}>
			{children}
		</Box>
	)
}
