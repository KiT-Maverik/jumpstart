import { Box, Typography, Fade } from '@mui/material'

import {projectName} from 'configuration/constants'

import style from './LoadingScreen.styles'

interface LoadingScreenProps {
	show: boolean
}

export const LoadingScreen = ({show}: LoadingScreenProps) => {
	return (
		<Fade in={show} appear={false} timeout={300}>
			<Box sx={style.container}>
				<Typography variant="h1">{projectName}</Typography>
				<Typography variant="h5" color="textDisabled">Loading</Typography>
			</Box>
		</Fade>
	)
}
