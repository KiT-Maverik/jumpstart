import NoContentIcon from '@mui/icons-material/CloudOff'
import { Box, SvgIcon, Typography } from '@mui/material'

export interface StubProps {
	icon?: React.ReactNode;
	message?: string;
}

export const Stub = ({
						 icon = <NoContentIcon/>,
						 message = 'No content'
					 }: StubProps) => {
	return (
		<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap={3} height={150}>
			<SvgIcon color="disabled" fontSize="large" >
				{icon}
			</SvgIcon>
			<Typography color="textDisabled">{message}</Typography>
		</Box>
	)
}
