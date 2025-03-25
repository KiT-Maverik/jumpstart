import { Box, Card, Stack, Typography } from '@mui/material'

import style from './AuthCard.styles'

interface AuthCardProps {
	title: string
	action: React.ReactNode;
	content: React.ReactNode;
	navigation: React.ReactNode;
}

export const AuthCard = ({action, content, navigation, title }: AuthCardProps) => {

	return (
		<Card sx={style.card} component="div">
			<Typography variant='h5' textAlign='center'>{title}</Typography>
			<Stack gap={3}>
				{content}
			</Stack>
			{action}
			<Box sx={style.actions}>
				{navigation}
			</Box>
		</Card>
	)
}
