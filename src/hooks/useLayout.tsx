import { useMediaQuery, useTheme } from '@mui/material'

/**
 * Custom hook to determine the current layout mode.
 */
export const useLayout = (strict = false) => {
	const theme = useTheme()

	const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))
	const isTabletStrict = useMediaQuery(theme.breakpoints.between('tablet', 'laptop'))
	const isTablet = useMediaQuery(theme.breakpoints.down('laptop'))
	const isLaptopStrict = useMediaQuery(theme.breakpoints.between('laptop', 'desktop'))
	const isLaptop = useMediaQuery(theme.breakpoints.down('desktop'))
	const isDesktopStrict = useMediaQuery(theme.breakpoints.between('desktop', 'fullWidth'))
	const isDesktop = useMediaQuery(theme.breakpoints.down('fullWidth'))
	const isFullWidth = useMediaQuery(theme.breakpoints.up('fullWidth'))

	return {
		isMobile,
		isTablet: strict ? isTabletStrict : isTablet,
		isLaptop: strict ? isLaptopStrict : isLaptop,
		isDesktop: strict ? isDesktopStrict : isDesktop,
		isFullWidth,
	}
}

/*
=================================
===||Version for non MUI projects
=================================

import { useCallback, useEffect, useState } from 'react'

export function useLayout() {
	const initialState = {
		isPhone: false,
		isTablet: false,
		isDesktop: false,
		isOversized: false,
	}

	const [screenType, setScreenType] = useState(initialState)

	const detectScreen = useCallback(() => {
		setScreenType({
			isPhone: window.matchMedia(`(max-width: ${breakpoints.values.tablet - 1}px)`).matches,
			isTablet:
				window.matchMedia(`(min-width: ${breakpoints.values.tablet}px)`).matches &&
				window.matchMedia(`(max-width: ${breakpoints.values.desktop - 1}px)`).matches,
			isDesktop: window.matchMedia(`(min-width: ${breakpoints.values.desktop}px)`).matches,
			isOversized: window.matchMedia(`(min-width: ${breakpoints.values.fullWidth + 1}px)`).matches,
		})
	}, [])

	useEffect(() => {
		detectScreen()
		window.addEventListener('resize', detectScreen)

		return () => {
			window.removeEventListener('resize', detectScreen)
		}
	}, [detectScreen])

	return screenType
}
*/
