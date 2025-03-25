import { Box, BoxProps, Card, CardProps, Divider, Typography, TypographyProps, LinearProgress } from '@mui/material'

import { normalizeSxProps } from 'utils'

import style from './ContentCard.styles'

interface ContentCardProps extends CardProps {
	applySpacing?: boolean;
	title: string
	actions?: React.ReactNode;
	showLoader?: boolean
	titleProps?: Omit<TypographyProps, 'children'>;
	contentWrapperProps?: Omit<BoxProps, 'children'>;
}

export const ContentCard = ({
								applySpacing = true,
								children,
								title,
								actions,
								titleProps,
								showLoader = false,
								contentWrapperProps,
								...cardProps
							}: ContentCardProps) => {
	return (
		<Card {...cardProps} sx={normalizeSxProps([style.card, cardProps.sx])}>
			{showLoader && <LinearProgress sx={style.loader} />}
			<Box sx={normalizeSxProps([
				style.header.container,
				applySpacing && style.header.spacing,
			])}>
				<Typography variant="h6" {...titleProps}>{title}</Typography>
				{actions}
			</Box>
			<Divider sx={style.content.divider}/>
			<Box
				{...contentWrapperProps}
				sx={normalizeSxProps([
					style.content.container,
					contentWrapperProps?.sx,
					applySpacing && style.content.spacing
				])}
			>
				{children}
			</Box>
		</Card>
	)
}
