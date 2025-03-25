import { Box, BoxProps } from '@mui/material'

import { normalizeSxProps } from 'utils'

import { Header } from './Header/Header'
import style from './Page.style'

interface PageProps extends Omit<BoxProps, 'title'> {
	defaultLayout?: boolean
	defaultSpacing?: boolean
}

/**
 * Generic content component
 *
 * This component intended to:
 * - Provide unified content layout
 * - Provide error boundaries
 *
 * Intended for usage as a wrapper for page-level components
 */
export const Page = ({
						 children,
						 defaultLayout = true,
						 defaultSpacing = true,
						 sx,
						 ...wrapperProps
					 }: PageProps) => {

	return (
		<Box
			flexGrow={1}
			sx={normalizeSxProps([
				defaultLayout && style.layout,
				defaultSpacing && style.spacing,
				sx,
			])}
			{...wrapperProps}
		>
			{children}
		</Box>
	)
}

Page.Header = Header
