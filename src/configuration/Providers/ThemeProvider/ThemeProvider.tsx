'use client'

import {
	PaletteMode,
	ThemeProvider as MUI_ThemeProvider,
	useMediaQuery,
	CssBaseline,
	GlobalStyles,
} from '@mui/material'
import { createContext, ReactNode, useCallback, useLayoutEffect, useMemo, useState } from 'react'

import { localStorageKey } from 'configuration/constants'
import { globalStyles, theme } from 'configuration/styles'

export type THEME_MODE = 'light' | 'dark'

export interface ThemeContext {
	themeMode: THEME_MODE
	toggleThemeMode: () => void
}

export const ThemeContext = createContext({} as ThemeContext)

interface ThemeProviderProps {
	children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [mode, setMode] = useState<PaletteMode>('light')
	const systemInDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

	useLayoutEffect(() => {
		const preferSystemTheme = false // Use a value from profile settings, when implemented

		if (preferSystemTheme) {
			localStorage.setItem(localStorageKey.theme, systemInDarkMode ? 'dark' : 'light')
			setMode(systemInDarkMode ? 'dark' : 'light')
			return
		}

		const modes: PaletteMode[] = ['light', 'dark']
		const recoveredTheme = (localStorage.getItem(localStorageKey.theme) as PaletteMode) ?? 'light'

		if (modes.includes(recoveredTheme)) setMode(recoveredTheme)
		else {
			setMode('light')
			localStorage.setItem(localStorageKey.theme, 'light')
		}
	}, [systemInDarkMode])

	const toggleThemeMode = useCallback(() => {
		const newMode = mode === 'light' ? 'dark' : 'light'

		setMode(newMode)
		localStorage.setItem(localStorageKey.theme, newMode)
	}, [mode])

	const contextValue = useMemo<ThemeContext>(
		() => ({
			toggleThemeMode,
			themeMode: mode,
		}),
		[mode, toggleThemeMode],
	)

	return (
		<ThemeContext.Provider value={contextValue}>
			<MUI_ThemeProvider theme={theme(mode)}>
				<CssBaseline />
				<GlobalStyles styles={globalStyles} />
				{children}
			</MUI_ThemeProvider>
		</ThemeContext.Provider>
	)
}
