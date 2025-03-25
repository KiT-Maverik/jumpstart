import { Alert, AlertTitle } from '@mui/material'

interface BackendFailureProps {
	show: boolean
}

export const BackendFailure = ({ show }: BackendFailureProps) => {
	if (!show) return null

	return (
		<Alert severity="error" variant="standard" mode="banner">
			<AlertTitle>Failed to fetch data</AlertTitle>
			Please reload the page
		</Alert>
	)
}
