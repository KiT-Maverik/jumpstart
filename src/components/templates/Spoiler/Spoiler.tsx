'use client'

import style from './Spoiler.styles'
import { Box, BoxProps, ButtonBase, Divider, Typography } from '@mui/material'
import ExpandIcon from '@mui/icons-material/ExpandMoreRounded';
import { useMemo, useRef } from 'react'
import { normalizeSxProps } from '../../../utils'
import { Stub, StubProps } from './Stub/Stub'
import { DeepPartial } from 'configuration/types/utility'

export type SpoilerStyles = DeepPartial<typeof style>

export interface SpoilerProps extends BoxProps {
	title: string;
	actions?: React.ReactNode;
	isFirst?: boolean;
	isLast?: boolean;
	stubProps?: StubProps
	customStyles?: SpoilerStyles
}

export const Spoiler = ({
							children,
							title,
							actions,
							isFirst = true,
							isLast = true,
							stubProps = {},
							customStyles = {},
							...wrapperProps
						}: SpoilerProps) => {
	const isExpanded = useRef(false)
	const chevronRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)

	const stub = useMemo(() => <Stub {...stubProps} />, [stubProps])

	const toggleExpand = () => {
		if (!chevronRef.current || !contentRef.current) return

		if (!isExpanded.current) {
			contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`
			chevronRef.current.style.transform = 'rotate(180deg)'
		} else {
			contentRef.current.style.maxHeight = '0px'
			chevronRef.current.style.transform = 'rotate(0)'
		}

		isExpanded.current = !isExpanded.current
	}

	return (
		<Box
			sx={normalizeSxProps([
				style.spoiler.container,
				isFirst && style.spoiler.first,
				isLast && style.spoiler.last
			])}
			{...wrapperProps}
		>
			<ButtonBase sx={style.header.container} disableRipple={true} onClick={() => toggleExpand()}>
				<Box ref={chevronRef} sx={style.header.chevron}>
					<ExpandIcon />
				</Box>
				<Typography sx={style.header.title}>{title}</Typography>
				<Box>{actions}</Box>
			</ButtonBase>
			<Box ref={contentRef}
				 sx={normalizeSxProps([style.content.wrapper, customStyles.content?.wrapper])}>
				<Divider />
				<Box sx={style.content.container}>
					{children ? children : stub}
				</Box>
			</Box>
		</Box>
	)
}
