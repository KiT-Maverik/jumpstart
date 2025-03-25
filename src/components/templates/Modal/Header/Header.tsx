import CloseIcon from '@mui/icons-material/Close'
import { Box, BoxProps, IconButton, Typography, TypographyProps } from '@mui/material'
import { ReactNode } from 'react'

import { normalizeSxProps } from 'utils'

import style from './Header.styles'
import { testId } from '../Modal.constants'

export interface ModalHeaderProps {
	/** modals header container props. */
	ContainerProps?: BoxProps
	/** modals header text props. */
	TypographyProps?: TypographyProps
	/** Custom modal close function. */
	onClose?: () => void
	children?: ReactNode
	title?: string
}

/**
 * Represents the header section of the modals.
 */
export  const Header = ({
					title,
					children,
							onClose,
					TypographyProps,
					ContainerProps
				}: ModalHeaderProps) => {

	if (!children && !title) console.warn('This defines both children and title. Title will be ignored.')

	return (
		<Box
			sx={normalizeSxProps([style.container, ContainerProps?.sx])}
			data-testid={testId.header.container}
		>
			{children}

			{title && (
				<Typography variant="h5" flexGrow={1} {...TypographyProps} data-testid={testId.header.title}>
					{title}
				</Typography>
			)}

			{onClose && (
				<IconButton
					onClick={onClose}
					data-testid={testId.header.closeButton}
				>
					<CloseIcon />
				</IconButton>
			)}
		</Box>
	)
}
