import { Box, BoxProps } from '@mui/material'
import { testId } from '../Modal.constants'
import style from './Content.styles'
import { normalizeSxProps } from '../../../../utils'

export type ModalContentProps = Omit<BoxProps, 'children'> & Required<Pick<BoxProps, 'children'>>

/**
 * Represents the content section of the modals.
 */
export const Content = ({ sx, children, ...boxProps }: BoxProps) => {
	return (
		<Box
			{...boxProps}
			sx={normalizeSxProps([style.container, sx])}
			data-testid={testId.body.container}
		>
			{children}
		</Box>
	)
}
