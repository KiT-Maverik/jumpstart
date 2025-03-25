import { ButtonProps, Button, CircularProgress } from '@mui/material'

export interface LoadingButtonProps extends ButtonProps {
	loading: boolean
	children: string
}

export const LoadingButton = ({ loading, children, ...boxProps }: LoadingButtonProps) => {
	return (
		<Button
			variant="contained"
			disabled={loading}
			{...boxProps}
			sx={{ position: 'relative', color: loading ? 'transparent !important' : undefined }}
		>
			{children}
			{loading && <CircularProgress sx={{ position: 'absolute' }} size={24} />}
		</Button>
	)
}
