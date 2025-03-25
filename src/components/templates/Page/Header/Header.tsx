import { Box, BoxProps, Typography, TypographyProps } from '@mui/material'

import { normalizeSxProps } from 'utils'

interface TitleProps extends Omit<BoxProps, 'title'> {
	actions: React.ReactNode
	containerProps?: BoxProps
	typographyProps?: TypographyProps
}

interface HeaderProps {
	actions?: React.ReactNode
	actionsProps?: BoxProps
	children?: React.ReactNode
	title: string
	titleProps?: TitleProps
	wrap?: boolean
	wrapperProps?: BoxProps
}

export const Header = ({
						   actions,
						   actionsProps,
						   children,
						   title,
						   titleProps,
						   wrap = true,
						   wrapperProps
					   }: HeaderProps) => {

	if (children) return children

	const renderTitle = () => {
		if (titleProps?.children) return titleProps.children

		return (
			<Box {...(titleProps?.containerProps ? titleProps.containerProps : {})}>
				<Typography
					variant='h3'
					component='h1'
					{...titleProps?.typographyProps}
				>
					{title}
				</Typography>
				{titleProps?.actions ? <Box>{actions}</Box> : null}
			</Box>
		)
	}

	const renderActions = () => {
		if (actions) return (
			<Box {...actionsProps}>
				{actions}
			</Box>
		)
		else return null
	}

	const renderHeader = () => {
		if (children) return children

		else return (
			<Box display='flex' alignItems='center' justifyContent='space-between' gap={3}>
				{renderTitle()}
				{renderActions()}
			</Box>
		)
	}

	if (wrap) return (
		<Box
			{...wrapperProps}
			 sx={normalizeSxProps([
				 {mb: 3},
				 wrapperProps?.sx,
			 ])}>
			{renderHeader()}
		</Box>
	)

	else return renderHeader()
}
