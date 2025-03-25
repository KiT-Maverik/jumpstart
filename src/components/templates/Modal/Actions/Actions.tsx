import { Box, BoxProps, Button } from '@mui/material'

import { testId } from '../Modal.constants'

export type ModalActionsProps =
	BoxProps &
	{
		onCancel?: () => void
		showCancelButton?: boolean
	}

/**
 * Represents the actions section of the modals.
 */
export const Actions = ({ children, onCancel, showCancelButton = true, ...boxProps }: ModalActionsProps) => {
	if (!children) return null

	return (
		<Box
			display='flex'
			justifyContent='end'
			alignItems='center'
			gap={4}
			data-testid={testId.actions.container}
			{...boxProps}
		>
			{showCancelButton && <Button onClick={onCancel}>Cancel</Button>}
			{children}
		</Box>
	)
}

// todo add memo in components
