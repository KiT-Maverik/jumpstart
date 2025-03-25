'use client'

import { Box } from '@mui/material'
import { Fragment, ReactNode, useMemo } from 'react'

import { ApiKeyBanner } from 'components/organisms'

export const BannerProvider = () => {
	const content = useMemo(() => {
		const result: ReactNode[] = []

		// TODO: Remove when other banners are in place
		if (false) result.push(<ApiKeyBanner key="demoBanner" />)
		return result

		// TODO: Remove when other banners are in place
		return [<Fragment key={'no banner'}></Fragment>]
	}, [])

	if (content.length === 0) return null

	return <Box>{content}</Box>
}
