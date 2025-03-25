import { Box, BoxProps, LinearProgress, Typography } from '@mui/material'
import style from './Stats.styles'

interface StatsProps extends BoxProps {
	title: string;
	data: {label: string, value: number, color?: 'success' | 'error'}[]
}

export const Stats = ({
						  title = 'Stats',
						  data = [],
	...boxProps
}: StatsProps) => {
	return (
		<Box sx={style.container} {...boxProps}>
			<Typography variant='h6' gridColumn='1/3'>{title}</Typography>
			{
				data.map(({ label, value, color }, index) => (
					<>
						<Typography variant='subtitle1'>{label}</Typography>
						<LinearProgress value={value} variant='determinate' sx={style.metric} color={color? color: 'inherit'}/>
					</>
				))
			}
		</Box>
	)
}
